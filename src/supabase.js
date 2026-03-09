import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// الخاص بك Supabase ضع هنا بيانات مشروع
const SUPABASE_URL = 'https://ggcswgxlbkeldpeuitce.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnY3N3Z3hsYmtlbGRwZXVpdGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3OTkyMjAsImV4cCI6MjA1NjM3NTIyMH0.n5aTbWxDpNDBRqwNGfvWFb6kVZiQLlXjGTEqI6OjC6Q'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
