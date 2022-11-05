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
          id: string
          back: string
          rating: number
        }
        Insert: {
          deck_id: string
          front: string
          id?: string
          back?: string
          rating?: number
        }
        Update: {
          deck_id?: string
          front?: string
          id?: string
          back?: string
          rating?: number
        }
      }
      decks: {
        Row: {
          created_by: string
          id: string
          title: string
        }
        Insert: {
          created_by: string
          id?: string
          title: string
        }
        Update: {
          created_by?: string
          id?: string
          title?: string
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

