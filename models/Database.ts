export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          deck_id: string
          front: string
          back: string
          rating: number
          id: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          deck_id: string
          front: string
          back: string
          rating: number
          id?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          deck_id?: string
          front?: string
          back?: string
          rating?: number
          id?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      decks: {
        Row: {
          created_by: string
          title: string
          id: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_by: string
          title: string
          id?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_by?: string
          title?: string
          id?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          display_name: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          display_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          display_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

