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
          front: string | null
          back: string | null
          rating: number
          id: string
        }
        Insert: {
          deck_id: string
          front?: string | null
          back?: string | null
          rating: number
          id?: string
        }
        Update: {
          deck_id?: string
          front?: string | null
          back?: string | null
          rating?: number
          id?: string
        }
      }
      decks: {
        Row: {
          created_by: string
          title: string | null
          id: string
        }
        Insert: {
          created_by: string
          title?: string | null
          id?: string
        }
        Update: {
          created_by?: string
          title?: string | null
          id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          display_name: string | null
        }
        Insert: {
          id: string
          display_name?: string | null
        }
        Update: {
          id?: string
          display_name?: string | null
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

