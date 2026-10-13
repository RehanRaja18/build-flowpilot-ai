import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  CircleCheck,
  FileText,
  GitBranch,
  Menu,
  Play,
  Sparkles,
  Webhook,
  Zap,
} from 'lucide-react'

const features = [
  { icon: Sparkles, title: 'Describe it naturally', copy: 'Tell FlowPilot what you want to automate. No schema or scripting required.' },
  { icon: GitBranch, title: 'See the whole picture', copy: 'Review every step in a visual workflow before anything runs.' },
  { icon: Bot, title: 'AI that does the work', copy: 'Summarize, classify, extract, and reason through your operational data.' },
  { icon: Zap, title: 'Ship in minutes', copy: 'Go from a rough idea to a reliable, reusable automation quickly.' },
  { icon: CircleCheck, title: 'Built for confidence', copy: 'Validate outputs, inspect runs, and keep your team in control.' },
  { icon: Webhook, title: 'Connect your stack', copy: 'Bring your existing tools together with secure triggers and actions.' },
]

const templates = [
  ['Customer feedback analyzer', 'Summarize feedback, detect sentiment, and flag urgent themes.', '4 steps'],
  ['Support ticket classifier', 'Route incoming requests to the right team with context attached.', '5 steps'],
  ['Daily report generator', 'Turn a day of updates into a clear report your team can act on.', '3 steps'],
]

function Logo() {
  return <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight"><span className="grid size-8 place-items-center rounded-lg bg-[#172d4d] text-white"><GitBranch className="size-4" /></span><span>FlowPilot <span className="text-[#2b7fff]">AI</span></span></Link>
}

function WorkflowPreview() {
  return <div className="relative rounded-2xl border border-[#d9e1ea] bg-white p-4 shadow-[0_24px_70px_rgba(20,44,76,0.13)] sm:p-6">
    <div className="mb-5 flex items-center justify-between border-b border-[#edf0f4] pb-4"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8491a3]">Workflow canvas</p><p className="mt-1 font-semibold text-[#172d4d]">Customer complaint triage</p></div><span className="flex items-center gap-1.5 rounded-full bg-[#eaf8f1] px-3 py-1.5 text-xs font-medium text-[#238052]"><span className="size-1.5 rounded-full bg-[#35ae73]" />Active</span></div>
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2">
      <div className="workflow-node border-[#cfe1f8] bg-[#f4f9ff]"><span className="node-icon bg-[#dcecff] text-[#2776dc]"><Webhook /></span><div><p className="font-semibold">New complaint</p><p className="text-xs text-[#8491a3]">Webhook trigger</p></div></div><ArrowRight className="mx-auto hidden size-4 text-[#9aabbe] sm:block" />
      <div className="workflow-node border-[#d7d1ff] bg-[#faf9ff]"><span className="node-icon bg-[#e9e6ff] text-[#6357dc]"><Sparkles /></span><div><p className="font-semibold">Summarize</p><p className="text-xs text-[#8491a3]">AI processing</p></div></div><ArrowRight className="mx-auto hidden size-4 text-[#9aabbe] sm:block" />
      <div className="workflow-node border-[#f0ddbd] bg-[#fffaf2]"><span className="node-icon bg-[#fff0d7] text-[#c88528]"><GitBranch /></span><div><p className="font-semibold">Check urgency</p><p className="text-xs text-[#8491a3]">If / else</p></div></div>
    </div>
    <div className="mt-3 flex justify-end"><div className="workflow-node w-full border-[#cde9db] bg-[#f4fcf7] sm:w-auto"><span className="node-icon bg-[#dcf5e6] text-[#2c9b66]"><FileText /></span><div><p className="font-semibold">Save result</p><p className="text-xs text-[#8491a3]">Database action</p></div></div></div>
    <div className="absolute -right-3 -top-3 hidden items-center gap-2 rounded-lg border border-[#d9e1ea] bg-white px-3 py-2 text-xs font-medium text-[#53647a] shadow-sm sm:flex"><Play className="size-3 fill-[#2b7fff] text-[#2b7fff]" /> Test run ready</div>
  </div>
}

export default function Page() {
  return <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-[#172d4d]">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><Logo /><nav className="hidden items-center gap-8 text-sm text-[#637187] md:flex"><Link href="#features" className="transition-colors hover:text-[#172d4d]">Features</Link><Link href="#how-it-works" className="transition-colors hover:text-[#172d4d]">How it works</Link><Link href="#pricing" className="transition-colors hover:text-[#172d4d]">Pricing</Link></nav><div className="flex items-center gap-3"><Link href="/login" className="hidden px-3 py-2 text-sm font-medium text-[#53647a] hover:text-[#172d4d] sm:block">Sign in</Link><Link href="/dashboard" className="rounded-lg bg-[#172d4d] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-transform hover:-translate-y-0.5">Get started <ArrowRight className="ml-1 inline size-3.5" /></Link><button className="ml-1 rounded-lg border border-[#d9e1ea] p-2 md:hidden" aria-label="Open menu"><Menu className="size-4" /></button></div></header>

    <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-24"><div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[460px] w-[800px] -translate-x-1/2 rounded-full bg-[#eaf2ff] blur-3xl" /><div className="relative z-10 mx-auto max-w-4xl text-center"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfe1f8] bg-white px-3 py-1.5 text-xs font-medium text-[#3977c7] shadow-sm"><Sparkles className="size-3.5" /> Your new automation co-pilot</div><h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#172d4d] sm:text-7xl">Turn ideas into <span className="text-[#2b7fff]">intelligent</span> workflows.</h1><p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#637187]">FlowPilot AI turns plain-English instructions into reliable automations your team can inspect, improve, and run with confidence.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/dashboard" className="rounded-lg bg-[#2b7fff] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(43,127,255,0.22)] transition-transform hover:-translate-y-0.5">Start building free <ArrowRight className="ml-1 inline size-4" /></Link><Link href="#demo" className="rounded-lg border border-[#d9e1ea] bg-white px-5 py-3 text-sm font-semibold text-[#53647a] hover:border-[#b9c7d8]">Explore demo <Play className="ml-1 inline size-3.5" /></Link></div></div><div id="demo" className="relative z-10 mx-auto mt-16 max-w-5xl"><WorkflowPreview /></div></section>

    <section id="features" className="border-y border-[#e5eaf0] bg-white px-5 py-20 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><div className="max-w-xl"><p className="eyebrow">Why FlowPilot</p><h2 className="section-title">The clarity of a plan.<br />The power to execute.</h2><p className="mt-4 leading-7 text-[#637187]">A thoughtful workspace for turning repetitive work into a system that runs itself.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#e5eaf0] bg-[#e5eaf0] sm:grid-cols-2 lg:grid-cols-3">{features.map(({ icon: Icon, title, copy }) => <div key={title} className="bg-white p-7 transition-colors hover:bg-[#fbfcfe]"><Icon className="size-5 text-[#2b7fff]" /><h3 className="mt-5 font-semibold text-[#172d4d]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#718096]">{copy}</p></div>)}</div></div></section>

    <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><p className="eyebrow">How it works</p><h2 className="section-title">From blank page to busywork-free.</h2><p className="mt-4 leading-7 text-[#637187]">You know the process. FlowPilot helps you capture it, improve it, and make it repeatable.</p><Link href="/dashboard" className="mt-7 inline-flex items-center text-sm font-semibold text-[#2b7fff]">Build your first workflow <ArrowRight className="ml-2 size-4" /></Link></div><div className="grid gap-8 sm:grid-cols-3">{[['01','Describe','Tell us what you want to automate in your own words.'],['02','Design','Review an AI-generated workflow and make it yours.'],['03','Run','Test it with real inputs, then let it handle the rest.']].map(([number,title,copy]) => <div key={number} className="border-t-2 border-[#dcecff] pt-5"><span className="text-xs font-semibold text-[#2b7fff]">{number}</span><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#718096]">{copy}</p></div>)}</div></div></section>

    <section className="bg-[#eef4fb] px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">Start with a template</p><h2 className="section-title">A head start for every team.</h2></div><Link href="/dashboard" className="text-sm font-semibold text-[#2b7fff]">View all templates <ArrowRight className="ml-1 inline size-4" /></Link></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{templates.map(([title,copy,steps]) => <Link href="/dashboard" key={title} className="group rounded-xl border border-[#dce5ef] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center justify-between"><span className="rounded-md bg-[#edf4ff] p-2 text-[#2b7fff]"><GitBranch className="size-4" /></span><span className="text-xs text-[#8491a3]">{steps}</span></div><h3 className="mt-6 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#718096]">{copy}</p><span className="mt-5 inline-flex items-center text-sm font-medium text-[#2b7fff]">Use template <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>

    <section id="pricing" className="px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="mx-auto max-w-xl text-center"><p className="eyebrow">Simple pricing</p><h2 className="section-title">Start small. Scale when ready.</h2></div><div className="mt-12 grid gap-4 lg:grid-cols-3">{[
      { name: 'Free', price: '$0', copy: 'For exploring automation', items: ['10 workflows', '100 runs / month', 'AI workflow builder'] },
      { name: 'Pro', price: '$24', copy: 'For growing teams', items: ['Unlimited workflows', '5,000 runs / month', 'Advanced AI nodes'] },
      { name: 'Team', price: '$79', copy: 'For teams in sync', items: ['Everything in Pro', 'Unlimited collaborators', 'Priority support'] },
    ].map((plan, index) => <div key={plan.name} className={`rounded-xl border p-7 ${index === 1 ? 'border-[#2b7fff] bg-[#172d4d] text-white shadow-xl' : 'border-[#dfe6ee] bg-white'}`}><p className={`text-sm font-semibold ${index === 1 ? 'text-[#8dbdff]' : 'text-[#2b7fff]'}`}>{plan.name}</p><p className="mt-5 text-4xl font-semibold tracking-tight">{plan.price}<span className={`ml-1 text-sm font-normal ${index === 1 ? 'text-[#aebed2]' : 'text-[#8491a3]'}`}>/ month</span></p><p className={`mt-3 text-sm ${index === 1 ? 'text-[#c1cedd]' : 'text-[#718096]'}`}>{plan.copy}</p><ul className="mt-7 flex flex-col gap-3">{plan.items.map(item => <li key={item} className="flex items-center gap-2 text-sm"><Check className={`size-4 ${index === 1 ? 'text-[#8dbdff]' : 'text-[#35ae73]'}`} />{item}</li>)}</ul><Link href="/dashboard" className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${index === 1 ? 'bg-[#2b7fff] text-white' : 'border border-[#d9e1ea] text-[#53647a]'}`}>Get started</Link></div>)}</div></div></section>

    <footer className="border-t border-[#e5eaf0] bg-white px-5 py-10 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><Logo /><div className="flex flex-wrap gap-5 text-sm text-[#718096]"><Link href="#features">Features</Link><Link href="#pricing">Pricing</Link><Link href="/dashboard">Dashboard</Link><Link href="/login">Sign in</Link></div><p className="text-xs text-[#9aa7b6]">© 2026 FlowPilot AI</p></div></footer>
  </main>
}
