'use client'

import Link from 'next/link'
import { useState } from 'react'
import { GitBranch } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function getSignupMessage(error: { code?: string; message: string } | null) {
  if (!error) return 'Check your inbox to confirm your email, then sign in.'

  const code = error.code?.toLowerCase() ?? ''
  const detail = error.message.toLowerCase()

  if (code === 'email_address_invalid' || detail.includes('email_address_invalid')) {
    return 'Supabase rejected this email address. Use a personal mailbox, not an example or disposable address.'
  }
  if (code === 'over_email_send_rate_limit' || detail.includes('rate limit')) {
    return 'Email sending is temporarily rate-limited. Wait a few minutes and try again.'
  }
  if (code === 'weak_password' || detail.includes('password')) {
    return error.message
  }
  if (code === 'signup_disabled' || detail.includes('signup is disabled')) {
    return 'Account creation is disabled in Supabase Auth. Enable email signups, then try again.'
  }
  if (detail.includes('already registered') || detail.includes('already been registered')) {
    return 'An account may already exist for this email. Try signing in instead.'
  }

  return 'Unable to create the account right now. Check your email and password, then try again.'
}

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setMessage('')

    const { error } = await createClient().auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
      },
    })

    setMessage(getSignupMessage(error))
    setPending(false)
  }

  return <main className="grid min-h-screen place-items-center bg-[#f8fafc] px-5 text-[#172d4d]"><div className="w-full max-w-md"><Link href="/" className="mb-10 flex items-center justify-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-[#172d4d] text-white"><GitBranch className="size-4" /></span>FlowPilot <span className="text-[#2b7fff]">AI</span></Link><div className="rounded-2xl border border-[#dfe6ee] bg-white p-7 shadow-sm"><h1 className="text-2xl font-semibold">Create your account</h1><p className="mt-2 text-sm text-[#718096]">Start building your first workflow.</p><form onSubmit={submit} className="mt-7 flex flex-col gap-4"><label className="text-sm font-medium">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-[#d9e1ea] px-3 py-2.5 outline-none focus:border-[#2b7fff]" /></label><label className="text-sm font-medium">Password<input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-[#d9e1ea] px-3 py-2.5 outline-none focus:border-[#2b7fff]" /></label>{message && <p role="status" className="text-sm text-[#53647a]">{message}</p>}<button disabled={pending} className="rounded-lg bg-[#2b7fff] px-4 py-3 font-semibold text-white disabled:opacity-60">{pending ? 'Creating account…' : 'Create account'}</button></form><p className="mt-6 text-center text-sm text-[#718096]">Already have an account? <Link href="/auth/login" className="font-semibold text-[#2b7fff]">Sign in</Link></p></div></div></main>
}
