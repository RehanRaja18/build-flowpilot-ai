'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, GitBranch } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setPending(true); setError('')
    const { error } = await createClient().auth.signInWithPassword({ email, password })
    if (error) setError(error.message.toLowerCase().includes('confirm') ? 'Please confirm your email before signing in.' : 'Invalid email or password.')
    else router.push('/dashboard')
    setPending(false)
  }
  return <main className="grid min-h-screen place-items-center bg-[#f8fafc] px-5 text-[#172d4d]"><div className="w-full max-w-md"><Link href="/" className="mb-10 flex items-center justify-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-[#172d4d] text-white"><GitBranch className="size-4" /></span>FlowPilot <span className="text-[#2b7fff]">AI</span></Link><div className="rounded-2xl border border-[#dfe6ee] bg-white p-7 shadow-sm"><h1 className="text-2xl font-semibold">Welcome back</h1><p className="mt-2 text-sm text-[#718096]">Sign in to manage your workflows.</p><form onSubmit={submit} className="mt-7 flex flex-col gap-4"><label className="text-sm font-medium">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-[#d9e1ea] px-3 py-2.5 outline-none focus:border-[#2b7fff]" /></label><label className="text-sm font-medium">Password<input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-[#d9e1ea] px-3 py-2.5 outline-none focus:border-[#2b7fff]" /></label>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<button disabled={pending} className="rounded-lg bg-[#2b7fff] px-4 py-3 font-semibold text-white disabled:opacity-60">{pending ? 'Signing in…' : 'Sign in'} <ArrowRight className="ml-1 inline size-4" /></button></form><p className="mt-6 text-center text-sm text-[#718096]">New to FlowPilot? <Link href="/auth/sign-up" className="font-semibold text-[#2b7fff]">Create an account</Link></p></div></div></main>
}
