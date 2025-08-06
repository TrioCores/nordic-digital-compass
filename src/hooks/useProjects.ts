import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface Project {
  id: string
  user_id: string
  client_name: string
  project_name: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface ProjectPhase {
  id: string
  project_id: string
  phase_name: string
  phase_order: number
  status: 'pending' | 'in-progress' | 'completed' | 'delayed'
  progress: number
  created_at: string
  updated_at: string
}

export interface ProjectUpdate {
  id: string
  project_id: string
  title: string
  description?: string
  created_by: string
  created_at: string
}

export interface WebsiteMetrics {
  id: string
  project_id: string
  page_views: number
  unique_visitors: number
  bounce_rate: number
  avg_session_duration: number
  updated_at: string
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isAdmin } = useAuth()

  const fetchProjects = async () => {
    try {
      setLoading(true)
      let query = supabase.from('projects').select('*')
      
      // If not admin, only get user's own projects
      if (!isAdmin()) {
        query = query.eq('user_id', user?.id)
      }
      
      const { data, error } = await query.order('created_at', { ascending: false })
      
      if (error) throw error
      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching projects')
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Use current user ID
      const finalProjectData = {
        ...projectData,
        user_id: user?.id || projectData.user_id
      }
      
      const { data, error } = await supabase
        .from('projects')
        .insert([finalProjectData])
        .select()
        .single()
      
      if (error) throw error
      await fetchProjects() // Refresh list
      return data
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    if (user) {
      fetchProjects()
    }
  }, [user])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject
  }
}

export const useProjectPhases = (projectId: string) => {
  const [phases, setPhases] = useState<ProjectPhase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPhases = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('project_phases')
        .select('*')
        .eq('project_id', projectId)
        .order('phase_order', { ascending: true })
      
      if (error) throw error
      setPhases(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching phases')
    } finally {
      setLoading(false)
    }
  }

  const updatePhase = async (phaseId: string, updates: Partial<ProjectPhase>) => {
    try {
      const { error } = await supabase
        .from('project_phases')
        .update(updates)
        .eq('id', phaseId)
      
      if (error) throw error
      await fetchPhases() // Refresh list
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    if (projectId) {
      fetchPhases()
    }
  }, [projectId])

  return {
    phases,
    loading,
    error,
    fetchPhases,
    updatePhase
  }
}

export const useProjectUpdates = (projectId: string) => {
  const [updates, setUpdates] = useState<ProjectUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchUpdates = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('project_updates')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setUpdates(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching updates')
    } finally {
      setLoading(false)
    }
  }

  const addUpdate = async (title: string, description?: string) => {
    try {
      const { error } = await supabase
        .from('project_updates')
        .insert([{
          project_id: projectId,
          title,
          description,
          created_by: user?.id
        }])
      
      if (error) throw error
      await fetchUpdates() // Refresh list
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    if (projectId) {
      fetchUpdates()
    }
  }, [projectId])

  return {
    updates,
    loading,
    error,
    fetchUpdates,
    addUpdate
  }
}

export const useWebsiteMetrics = (projectId: string) => {
  const [metrics, setMetrics] = useState<WebsiteMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('website_metrics')
        .select('*')
        .eq('project_id', projectId)
        .single()
      
      if (error) throw error
      setMetrics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching metrics')
    } finally {
      setLoading(false)
    }
  }

  const updateMetrics = async (updates: Partial<WebsiteMetrics>) => {
    try {
      const { error } = await supabase
        .from('website_metrics')
        .update(updates)
        .eq('project_id', projectId)
      
      if (error) throw error
      await fetchMetrics() // Refresh data
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    if (projectId) {
      fetchMetrics()
    }
  }, [projectId])

  return {
    metrics,
    loading,
    error,
    fetchMetrics,
    updateMetrics
  }
}
