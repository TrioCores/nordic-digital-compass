import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthUser extends User {
  role?: 'user' | 'admin' | 'owner'
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', authUser.id)
        .single()

      setUser({
        ...authUser,
        role: profile?.role || 'user'
      })
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setUser({ ...authUser, role: 'user' })
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    // Create user profile
    if (data.user && !error) {
      await supabase.from('user_profiles').insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName,
        role: 'user'
      })
    }

    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const isAdmin = () => {
    return user?.role === 'admin' || user?.role === 'owner'
  }

  const isOwner = () => {
    return user?.role === 'owner'
  }

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    isOwner,
  }
}
