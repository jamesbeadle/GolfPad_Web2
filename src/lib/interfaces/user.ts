export interface User {
    id: string
    app_metadata: Record<string, any>
    user_metadata: Record<string, any>
    aud: string
    created_at: string
    email: string
    phone: string
    role: string
    updated_at: string
    // Additional optional fields depending on provider
    email_confirmed_at?: string
    invited_at?: string
    action_link?: string
    identities?: Array<Record<string, any>>
  }