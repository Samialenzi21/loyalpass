import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// ضع هنا بيانات مشروع Supabase الخاص بك
const SUPABASE_URL = 'https://ggcswgxlbkeldpeuitce.supabase.co'const SUPABASE_ANON_KEY = 'sb_publishable_Xoq-s7IZFkiSu0UjyvEVAw_bCExY7'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
