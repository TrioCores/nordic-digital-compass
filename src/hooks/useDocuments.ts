import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface Document {
  id: string
  name: string
  original_name: string
  file_path: string
  file_size: number
  file_type: string
  uploaded_by: string
  uploaded_at: string
  description?: string
  tags?: string[]
}

export function useDocuments() {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const getDocuments = async (): Promise<{ data: Document[] | null; error: any }> => {
    try {
      setLoading(true)
      console.log('Fetching documents...')
      
      // Simplified query without join for now
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('uploaded_at', { ascending: false })

      if (error) {
        console.error('Error fetching documents:', error)
        return { data: null, error }
      }
      
      console.log('Documents fetched successfully:', data)
      return { data, error }
    } catch (error) {
      console.error('Unexpected error fetching documents:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const uploadDocument = async (
    file: File,
    description?: string,
    tags?: string[]
  ): Promise<{ data: Document | null; error: any }> => {
    try {
      setUploading(true)
      console.log('Starting upload for file:', file.name, 'Size:', file.size, 'Type:', file.type)

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('No authenticated user found')
        return { data: null, error: 'Not authenticated' }
      }
      console.log('User authenticated:', user.id)

      // Upload file to storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `documents/${fileName}`
      
      console.log('Uploading to path:', filePath)

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        return { data: null, error: uploadError }
      }
      console.log('File uploaded successfully to storage')

      // Create document record
      const documentData = {
        name: file.name.split('.')[0],
        original_name: file.name,
        file_path: filePath,
        file_size: file.size,
        file_type: file.type,
        uploaded_by: user.id,
        description,
        tags,
      }
      console.log('Creating document record:', documentData)

      const { data, error } = await supabase
        .from('documents')
        .insert(documentData)
        .select()
        .single()

      if (error) {
        console.error('Database insert error:', error)
        return { data: null, error }
      }
      
      console.log('Document record created successfully:', data)
      return { data, error }
    } catch (error) {
      console.error('Unexpected error in uploadDocument:', error)
      return { data: null, error }
    } finally {
      setUploading(false)
    }
  }

  const deleteDocument = async (id: string, filePath: string): Promise<{ error: any }> => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([filePath])

      if (storageError) {
        console.warn('Failed to delete file from storage:', storageError)
      }

      // Delete from database
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const downloadDocument = async (filePath: string): Promise<{ data: Blob | null; error: any }> => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(filePath)

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  const getDownloadUrl = async (filePath: string): Promise<{ data: { publicUrl: string } | null; error: any }> => {
    try {
      const { data } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const updateDocument = async (
    id: string,
    updates: Partial<Pick<Document, 'name' | 'description' | 'tags'>>
  ): Promise<{ data: Document | null; error: any }> => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  return {
    loading,
    uploading,
    getDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument,
    getDownloadUrl,
    updateDocument,
  }
}
