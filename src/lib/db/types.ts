export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string
          createdAt: string
          id: string
          label: string
        }
        Insert: {
          content: string
          createdAt?: string
          id?: string
          label: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          label?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          firstName: string
          id: string
          lastName: string
        }
        Insert: {
          firstName: string
          id: string
          lastName: string
        }
        Update: {
          firstName?: string
          id?: string
          lastName?: string
        }
        Relationships: [
          {
            foreignKeyName: "id_fk"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      todos: {
        Row: {
          createdAt: string
          createdById: string | null
          deadline: string | null
          description: string
          id: string
          label: string
          status: Database["public"]["Enums"]["todos_enum"]
        }
        Insert: {
          createdAt?: string
          createdById?: string | null
          deadline?: string | null
          description: string
          id?: string
          label: string
          status?: Database["public"]["Enums"]["todos_enum"]
        }
        Update: {
          createdAt?: string
          createdById?: string | null
          deadline?: string | null
          description?: string
          id?: string
          label?: string
          status?: Database["public"]["Enums"]["todos_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "created_by_id_fk"
            columns: ["createdById"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          lightmode: boolean
          pushNotifications: boolean
          reducedMotion: boolean
          tableRows: number
          userId: string
        }
        Insert: {
          lightmode?: boolean
          pushNotifications?: boolean
          reducedMotion?: boolean
          tableRows?: number
          userId: string
        }
        Update: {
          lightmode?: boolean
          pushNotifications?: boolean
          reducedMotion?: boolean
          tableRows?: number
          userId?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      todos_enum: "done" | "todo" | "in progress"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

