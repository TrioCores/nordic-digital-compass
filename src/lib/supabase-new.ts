import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'user' | 'admin' | 'owner'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'user' | 'admin' | 'owner'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'user' | 'admin' | 'owner'
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          original_name: string
          file_path: string
          file_size: number
          file_type: string
          uploaded_by: string
          description: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          name: string
          original_name: string
          file_path: string
          file_size: number
          file_type: string
          uploaded_by: string
          description?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          name?: string
          original_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          uploaded_by?: string
          description?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          uploaded_at?: string
        }
      }
    }
  }
}
