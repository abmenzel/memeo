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
          id: string
          deck_id: string
          created_at: string | null
          updated_at: string | null
          front: string
          back: string
          rating: number
        }
        Insert: {
          id?: string
          deck_id: string
          created_at?: string | null
          updated_at?: string | null
          front: string
          back: string
          rating: number
        }
        Update: {
          id?: string
          deck_id?: string
          created_at?: string | null
          updated_at?: string | null
          front?: string
          back?: string
          rating?: number
        }
      }
      decks: {
        Row: {
          id: string
          created_by: string
          created_at: string | null
          updated_at: string | null
          title: string
          order: number
          tag_id: string | null
        }
        Insert: {
          id?: string
          created_by: string
          created_at?: string | null
          updated_at?: string | null
          title: string
          order?: number
          tag_id?: string | null
        }
        Update: {
          id?: string
          created_by?: string
          created_at?: string | null
          updated_at?: string | null
          title?: string
          order?: number
          tag_id?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string | null
          updated_at: string | null
          display_name: string | null
        }
        Insert: {
          id: string
          created_at?: string | null
          updated_at?: string | null
          display_name?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          updated_at?: string | null
          display_name?: string | null
        }
      }
      tags: {
        Row: {
          id: string
          created_at: string
          name: string
          color: string
          created_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          color: string
          created_by: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          color?: string
          created_by?: string
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

