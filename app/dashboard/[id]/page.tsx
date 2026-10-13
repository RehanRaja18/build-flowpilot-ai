import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import WorkflowEditor from './workflow-editor'

type Props = { params: Promise<{ id: string }> }

export default async function WorkflowPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: workflow } = await supabase
    .from('workflows')
    .select('id,name,description,status,steps,created_at,updated_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!workflow) notFound()
  return <WorkflowEditor email={user.email ?? ''} workflow={workflow} />
}

export const dynamic = 'force-dynamic'
