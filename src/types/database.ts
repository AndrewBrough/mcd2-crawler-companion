export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of creating createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      archetype_effects: {
        Row: {
          archetype_id: string
          effect_id: string
        }
        Insert: {
          archetype_id: string
          effect_id: string
        }
        Update: {
          archetype_id?: string
          effect_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'archetype_effects_archetype_id_fkey'
            columns: ['archetype_id']
            isOneToOne: false
            referencedRelation: 'archetypes'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'archetype_effects_effect_id_fkey'
            columns: ['effect_id']
            isOneToOne: false
            referencedRelation: 'effects'
            referencedColumns: ['slug']
          },
        ]
      }
      archetypes: {
        Row: {
          created_at: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      effects: {
        Row: {
          created_at: string
          description: string
          gear_slugs: string[]
          level_1: number | null
          level_2: number | null
          level_3: number | null
          name: string
          slug: string
          unique_bound: string[]
          unique_level: number | null
        }
        Insert: {
          created_at?: string
          description?: string
          gear_slugs?: string[]
          level_1?: number | null
          level_2?: number | null
          level_3?: number | null
          name: string
          slug: string
          unique_bound?: string[]
          unique_level?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          gear_slugs?: string[]
          level_1?: number | null
          level_2?: number | null
          level_3?: number | null
          name?: string
          slug?: string
          unique_bound?: string[]
          unique_level?: number | null
        }
        Relationships: []
      }
      enchantments: {
        Row: {
          categories: string[]
          created_at: string
          description: string
          gear_types: string[]
          name: string
          slug: string
          sources: string[]
          tier_1: string
          tier_2: string
          tier_3: string
        }
        Insert: {
          categories?: string[]
          created_at?: string
          description?: string
          gear_types: string[]
          name: string
          slug: string
          sources?: string[]
          tier_1?: string
          tier_2?: string
          tier_3?: string
        }
        Update: {
          categories?: string[]
          created_at?: string
          description?: string
          gear_types?: string[]
          name?: string
          slug?: string
          sources?: string[]
          tier_1?: string
          tier_2?: string
          tier_3?: string
        }
        Relationships: []
      }
      enemies: {
        Row: {
          created_at: string
          description: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      enemy_gear_drops: {
        Row: {
          drop_rate: number
          enemy_id: string
          gear_id: string
        }
        Insert: {
          drop_rate: number
          enemy_id: string
          gear_id: string
        }
        Update: {
          drop_rate?: number
          enemy_id?: string
          gear_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'enemy_gear_drops_enemy_id_fkey'
            columns: ['enemy_id']
            isOneToOne: false
            referencedRelation: 'enemies'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'enemy_gear_drops_gear_id_fkey'
            columns: ['gear_id']
            isOneToOne: false
            referencedRelation: 'gear'
            referencedColumns: ['slug']
          },
        ]
      }
      enemy_item_drops: {
        Row: {
          drop_rate: number
          enemy_id: string
          item_id: string
        }
        Insert: {
          drop_rate: number
          enemy_id: string
          item_id: string
        }
        Update: {
          drop_rate?: number
          enemy_id?: string
          item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'enemy_item_drops_enemy_id_fkey'
            columns: ['enemy_id']
            isOneToOne: false
            referencedRelation: 'enemies'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'enemy_item_drops_item_id_fkey'
            columns: ['item_id']
            isOneToOne: false
            referencedRelation: 'items'
            referencedColumns: ['slug']
          },
        ]
      }
      gear: {
        Row: {
          created_at: string
          description: string
          name: string
          rarity: string[]
          set_id: string | null
          slug: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string
          name: string
          rarity?: string[]
          set_id?: string | null
          slug: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          name?: string
          rarity?: string[]
          set_id?: string | null
          slug?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'gear_set_id_fkey'
            columns: ['set_id']
            isOneToOne: false
            referencedRelation: 'sets'
            referencedColumns: ['slug']
          },
        ]
      }
      gear_enchantments: {
        Row: {
          enchantment_id: string
          gear_id: string
        }
        Insert: {
          enchantment_id: string
          gear_id: string
        }
        Update: {
          enchantment_id?: string
          gear_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'gear_enchantments_enchantment_id_fkey'
            columns: ['enchantment_id']
            isOneToOne: false
            referencedRelation: 'enchantments'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'gear_enchantments_gear_id_fkey'
            columns: ['gear_id']
            isOneToOne: false
            referencedRelation: 'gear'
            referencedColumns: ['slug']
          },
        ]
      }
      items: {
        Row: {
          description: string
          name: string
          slug: string
        }
        Insert: {
          description?: string
          name: string
          slug: string
        }
        Update: {
          description?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      location_enemies: {
        Row: {
          enemy_id: string
          location_id: string
        }
        Insert: {
          enemy_id: string
          location_id: string
        }
        Update: {
          enemy_id?: string
          location_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'location_enemies_enemy_id_fkey'
            columns: ['enemy_id']
            isOneToOne: false
            referencedRelation: 'enemies'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'location_enemies_location_id_fkey'
            columns: ['location_id']
            isOneToOne: false
            referencedRelation: 'locations'
            referencedColumns: ['slug']
          },
        ]
      }
      location_gear_drops: {
        Row: {
          drop_rate: number
          gear_id: string
          location_id: string
        }
        Insert: {
          drop_rate: number
          gear_id: string
          location_id: string
        }
        Update: {
          drop_rate?: number
          gear_id?: string
          location_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'location_gear_drops_gear_id_fkey'
            columns: ['gear_id']
            isOneToOne: false
            referencedRelation: 'gear'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'location_gear_drops_location_id_fkey'
            columns: ['location_id']
            isOneToOne: false
            referencedRelation: 'locations'
            referencedColumns: ['slug']
          },
        ]
      }
      location_item_drops: {
        Row: {
          drop_rate: number
          item_id: string
          location_id: string
        }
        Insert: {
          drop_rate: number
          item_id: string
          location_id: string
        }
        Update: {
          drop_rate?: number
          item_id?: string
          location_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'location_item_drops_item_id_fkey'
            columns: ['item_id']
            isOneToOne: false
            referencedRelation: 'items'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'location_item_drops_location_id_fkey'
            columns: ['location_id']
            isOneToOne: false
            referencedRelation: 'locations'
            referencedColumns: ['slug']
          },
        ]
      }
      location_relations: {
        Row: {
          location_id: string
          related_location_id: string
        }
        Insert: {
          location_id: string
          related_location_id: string
        }
        Update: {
          location_id?: string
          related_location_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'location_relations_location_id_fkey'
            columns: ['location_id']
            isOneToOne: false
            referencedRelation: 'locations'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'location_relations_related_location_id_fkey'
            columns: ['related_location_id']
            isOneToOne: false
            referencedRelation: 'locations'
            referencedColumns: ['slug']
          },
        ]
      }
      locations: {
        Row: {
          created_at: string
          description: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      set_archetypes: {
        Row: {
          archetype_id: string
          set_id: string
        }
        Insert: {
          archetype_id: string
          set_id: string
        }
        Update: {
          archetype_id?: string
          set_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'set_archetypes_archetype_id_fkey'
            columns: ['archetype_id']
            isOneToOne: false
            referencedRelation: 'archetypes'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'set_archetypes_set_id_fkey'
            columns: ['set_id']
            isOneToOne: false
            referencedRelation: 'sets'
            referencedColumns: ['slug']
          },
        ]
      }
      set_effects: {
        Row: {
          effect_id: string
          set_id: string
        }
        Insert: {
          effect_id: string
          set_id: string
        }
        Update: {
          effect_id?: string
          set_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'set_effects_effect_id_fkey'
            columns: ['effect_id']
            isOneToOne: false
            referencedRelation: 'effects'
            referencedColumns: ['slug']
          },
          {
            foreignKeyName: 'set_effects_set_id_fkey'
            columns: ['set_id']
            isOneToOne: false
            referencedRelation: 'sets'
            referencedColumns: ['slug']
          },
        ]
      }
      sets: {
        Row: {
          created_at: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          name?: string
          slug?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
