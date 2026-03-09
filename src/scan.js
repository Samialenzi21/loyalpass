import { supabase } from './supabase.js'
import { getCurrentMerchant } from './auth.js'

export async function scanCustomer(customerId) {
  const merchant = await getCurrentMerchant()
  const { data: customer, error } = await supabase
    .from('customers').select('*')
    .eq('id', customerId).eq('merchant_id', merchant.id).single()
  if (error || !customer) throw new Error('الزبون غير موجود')

  const newPoints = customer.points + 1
  const isReward = newPoints >= merchant.reward_threshold

  if (isReward) {
    await supabase.from('customers').update({
      points: 0,
      total_visits: customer.total_visits + 1,
      total_rewards: customer.total_rewards + 1
    }).eq('id', customerId)
    await supabase.from('scans').insert({ merchant_id: merchant.id, customer_id: customerId, type: 'redeem' })
    return { status: 'reward', message: 'مبروك! قهوة مجانية', points: 0, threshold: merchant.reward_threshold, customer }
  } else {
    await supabase.from('customers').update({
      points: newPoints,
      total_visits: customer.total_visits + 1
    }).eq('id', customerId)
    await supabase.from('scans').insert({ merchant_id: merchant.id, customer_id: customerId, type: 'add_point' })
    return { status: 'point_added', message: `تمت الإضافة ${newPoints}/${merchant.reward_threshold}`, points: newPoints, threshold: merchant.reward_threshold, customer }
  }
}

export async function registerCustomer(name, phone) {
  const merchant = await getCurrentMerchant()
  const { data, error } = await supabase.from('customers')
    .insert({ merchant_id: merchant.id, name, phone, points: 0, total_visits: 0, total_rewards: 0 })
    .select().single()
  if (error) throw error
  return data
}
