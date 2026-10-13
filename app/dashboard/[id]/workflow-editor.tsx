'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, ChevronDown, GripVertical, GitBranch, LogOut, Play, Plus, Save, Trash2, Zap, Sparkles, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Step = { id: string; type: 'trigger' | 'ai' | 'action'; label: string; detail: string }
type Workflow = { id: string; name: string; description: string; status: 'draft' | 'active' | 'paused'; steps: Step[]; created_at: string; updated_at: string }

const stepOptions: Array<{ type: Step['type']; label: string; detail: string }> = [
  { type: 'trigger', label: 'When a new request arrives', detail: 'Start when an event matches your trigger.' },
  { type: 'ai', label: 'Analyze with AI', detail: 'Classify, summarize, or transform incoming content.' },
  { type: 'action', label: 'Send a notification', detail: 'Deliver the result to a connected destination.' },
]

function normalizeSteps(steps: unknown): Step[] {
  if (!Array.isArray(steps)) return []
  return steps.map((step, index) => {
    const value = step as Partial<Step>
    return { id: value.id ?? `${value.type ?? 'step'}-${index}`, type: value.type === 'ai' || value.type === 'action' ? value.type : 'trigger', label: value.label ?? 'Workflow step', detail: value.detail ?? 'Configure this step to continue.' }
  })
}

export default function WorkflowEditor({ email, workflow }: { email: string; workflow: Workflow }) {
  const router = useRouter()
  const supabase = createClient()
  const [name, setName] = useState(workflow.name)
  const [description, setDescription] = useState(workflow.description)
  const [status, setStatus] = useState(workflow.status)
  const [steps, setSteps] = useState<Step[]>(normalizeSteps(workflow.steps))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const progress = useMemo(() => Math.min(100, Math.round((steps.length / 3) * 100)), [steps.length])

  function addStep(option: typeof stepOptions[number]) {
    setSteps(current => [...current, { ...option, id: `${option.type}-${crypto.randomUUID()}` }])
    setMenuOpen(false)
    setSaved(false)
  }
  function removeStep(id: string) { setSteps(current => current.filter(step => step.id !== id)); setSaved(false) }
  function updateStep(id: string, label: string) { setSteps(current => current.map(step => step.id === id ? { ...step, label } : step)); setSaved(false) }
  async function save() {
    if (!name.trim() || saving) return
    setSaving(true); setSaved(false)
    const { error } = await supabase.from('workflows').update({ name: name.trim(), description: description.trim(), status, steps }).eq('id', workflow.id)
    if (!error) { setSaved(true); router.refresh() }
    setSaving(false)
  }
  async function signOut() { await supabase.auth.signOut(); router.push('/') }

  return <main className="min-h-screen bg-[#f7f9fc] text-[#172d4d]">
    <header className="border-b border-[#e5eaf0] bg-white"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-8">
      <div className="flex items-center gap-6"><a href="/dashboard" className="flex items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-[#172d4d] text-white"><GitBranch className="size-4" /></span>FlowPilot <span className="text-[#2b7fff]">AI</span></a><span className="hidden text-sm text-[#a2acb9] md:block">/ Workflow editor</span></div>
      <div className="flex items-center gap-4 text-sm"><span className="hidden text-[#718096] sm:block">{email}</span><button onClick={signOut} className="flex items-center gap-2 text-[#53647a] hover:text-[#172d4d]"><LogOut className="size-4" />Sign out</button></div>
    </div></header>
    <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start"><div><a href="/dashboard" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#53647a] hover:text-[#2b7fff]"><ArrowLeft className="size-4" />Back to workflows</a><input value={name} onChange={e => { setName(e.target.value); setSaved(false) }} className="block w-full max-w-2xl bg-transparent text-3xl font-semibold tracking-tight outline-none" aria-label="Workflow name" /><textarea value={description} onChange={e => { setDescription(e.target.value); setSaved(false) }} className="mt-2 min-h-12 w-full max-w-2xl resize-none bg-transparent text-[#718096] outline-none" aria-label="Workflow description" /></div><div className="flex items-center gap-3"><span className={`rounded-full px-3 py-1.5 text-xs font-medium ${status === 'active' ? 'bg-[#eaf8f1] text-[#238052]' : 'bg-[#eef2f6] text-[#53647a]'}`}>{status}</span><button onClick={save} disabled={saving || !name.trim()} className="inline-flex items-center gap-2 rounded-lg bg-[#2b7fff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#196ce8] disabled:opacity-50"><Save className="size-4" />{saving ? 'Saving...' : saved ? 'Saved' : 'Save changes'}</button></div></div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-2xl border border-[#dfe6ee] bg-white p-5 shadow-sm md:p-8"><div className="mb-8 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2b7fff]">Workflow canvas</p><h2 className="mt-1 text-xl font-semibold">Build your automation</h2></div><div className="text-right"><p className="text-sm font-semibold">{steps.length} steps</p><p className="text-xs text-[#718096]">{progress}% configured</p></div></div><div className="relative flex flex-col items-center gap-0">
          {steps.length === 0 && <div className="rounded-xl border border-dashed border-[#cbd7e4] px-8 py-12 text-center text-sm text-[#718096]">Add your first step to start building.</div>}
          {steps.map((step, index) => <div key={step.id} className="relative flex w-full max-w-2xl flex-col items-center"><div className="group flex w-full items-start gap-4 rounded-xl border border-[#dfe6ee] bg-[#fbfcfe] p-4 transition hover:border-[#a9c8f7]"><div className="mt-1 text-[#b2bfcc]"><GripVertical className="size-4" /></div><div className={`grid size-10 shrink-0 place-items-center rounded-lg ${step.type === 'trigger' ? 'bg-[#e8f1ff] text-[#2b7fff]' : step.type === 'ai' ? 'bg-[#f0eaff] text-[#7555d9]' : 'bg-[#eaf8f1] text-[#238052]'}`}>{step.type === 'trigger' ? <Zap className="size-5" /> : step.type === 'ai' ? <Sparkles className="size-5" /> : <Send className="size-5" />}</div><div className="min-w-0 flex-1"><p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8a98aa]">{step.type}</p><input value={step.label} onChange={e => updateStep(step.id, e.target.value)} className="w-full bg-transparent font-medium outline-none" aria-label={`${step.type} step label`} /><p className="mt-1 text-sm text-[#718096]">{step.detail}</p></div><button onClick={() => removeStep(step.id)} className="rounded-md p-2 text-[#a2acb9] opacity-0 transition hover:bg-[#fff0f0] hover:text-[#d45151] group-hover:opacity-100" aria-label={`Remove ${step.label}`}><Trash2 className="size-4" /></button></div>{index < steps.length - 1 && <div className="h-8 w-px bg-[#cbd7e4]" />}</div>)}
          <div className="relative mt-7"><button onClick={() => setMenuOpen(value => !value)} className="inline-flex items-center gap-2 rounded-lg border border-[#cbd7e4] bg-white px-4 py-2.5 text-sm font-medium text-[#53647a] hover:border-[#2b7fff] hover:text-[#2b7fff]"><Plus className="size-4" />Add step<ChevronDown className="size-4" /></button>{menuOpen && <div className="absolute left-1/2 top-full z-10 mt-2 w-72 -translate-x-1/2 rounded-xl border border-[#dfe6ee] bg-white p-2 shadow-xl">{stepOptions.map(option => <button key={option.type} onClick={() => addStep(option)} className="flex w-full items-start gap-3 rounded-lg p-3 text-left hover:bg-[#f4f8fd]"><span className="mt-0.5 text-[#2b7fff]">{option.type === 'trigger' ? <Zap className="size-4" /> : option.type === 'ai' ? <Sparkles className="size-4" /> : <Send className="size-4" />}</span><span><span className="block text-sm font-medium">{option.label}</span><span className="mt-0.5 block text-xs text-[#718096]">{option.detail}</span></span></button>)}</div>}</div>
        </div></section>
        <aside className="flex flex-col gap-6"><div className="rounded-2xl border border-[#dfe6ee] bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a98aa]">Workflow status</p><div className="mt-4 grid gap-2">{(['draft', 'active', 'paused'] as const).map(value => <button key={value} onClick={() => { setStatus(value); setSaved(false) }} className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm capitalize ${status === value ? 'border-[#2b7fff] bg-[#f0f6ff] text-[#2b7fff]' : 'border-[#e5eaf0] text-[#53647a]'}`}>{value}{status === value && <Check className="size-4" />}</button>)}</div><button onClick={save} disabled={saving} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#dfe6ee] px-3 py-2.5 text-sm font-medium text-[#53647a] hover:border-[#2b7fff] hover:text-[#2b7fff]"><Play className="size-4" />{status === 'active' ? 'Run workflow' : 'Save and activate'}</button></div><div className="rounded-2xl bg-[#172d4d] p-6 text-white"><p className="text-sm font-semibold">Make it yours</p><p className="mt-2 text-sm leading-6 text-[#b9c8da]">Connect your trigger, AI step, and destination to turn this draft into a reliable automation.</p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#4fa3ff] transition-all" style={{ width: `${progress}%` }} /></div></div></aside>
      </div>
    </div>
  </main>
}
