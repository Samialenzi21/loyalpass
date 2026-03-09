import { supabase } from './supabase.js'

export async function getCurrentMerchant() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('merchants').select('*').eq('user_id', user.id).single()
  return data
}

export async function logout() {
  await supabase.auth.signOut()
  window.location.href = '/index.html'
}

export async function requireAuth() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) window.location.href = '/index.html'
  return user
}
