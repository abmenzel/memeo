import { createClient } from '@supabase/supabase-js'
import { Database } from '../models/Database'

const config = {
	supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || 'test',
	supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY || 'key',
}

export const supabase = createClient<Database>(
	config.supabaseUrl,
	config.supabaseKey
)
