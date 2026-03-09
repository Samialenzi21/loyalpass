import { supabase } from './supabase.js'
import { getCurrentMerchant } from './auth.js'

export async function getDashboardStats() {
  const merchant = await getCurrentMerchant()
  const today = new Date().toISOString().split('T')[0]

  const [{ count: totalCustomers }, { count: todayScans }, { count: totalRewards }, { data: recentScans }] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }).eq('merchant_id', merchant.id),
    supabase.from('scans').select('*', { count: 'exact', head: true }).eq('merchant_id', merchant.id).gte('created_at', today),
    supabase.from('scans').select('*', { count: 'exact', head: true }).eq('merchant_id', merchant.id).eq('type', 'redeem'),
    supabase.from('scans').select('*, customers(name, phone)').eq('merchant_id', merchant.id).order('created_at', { ascending: false }).limit(10)
  ])

  return { totalCustomers, todayScans, totalRewards, recentScans, merchant }
}

export async function getCustomers() {
  const merchant = await getCurrentMerchant()
  const { data, error } = await supabase
    .from('customers').select('*')
    .eq('merchant_id', merchant.id)
    .order('total_visits', { ascending: false })
  if (error) throw error
  return data
}
