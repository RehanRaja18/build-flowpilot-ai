import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  const { data: workflows } = await supabase.from('workflows').select('id,name,description,status,steps,created_at,updated_at').order('updated_at', { ascending: false })
  return <DashboardClient email={user.email ?? ''} initialWorkflows={workflows ?? []} />
}
