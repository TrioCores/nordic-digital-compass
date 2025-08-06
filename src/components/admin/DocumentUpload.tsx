import { useState, useCallback } from 'react'
import { useDocuments } from '@/hooks/useDocuments'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { Upload, File, X, Plus, Loader2, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface DocumentUploadProps {
  onUploadSuccess?: () => void
}

const DocumentUpload = ({ onUploadSuccess }: DocumentUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const { uploadDocument, uploading } = useDocuments()
  const { toast } = useToast()

  // Allowed file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
    'application/json',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/zip',
    'application/x-rar-compressed'
  ]

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return `Filtype ikke tilladt. Tilladte typer: PDF, Word, Excel, PowerPoint, billeder, tekst filer`
    }
    
    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return `Filen er for stor. Maksimal størrelse: 50MB`
    }
    
    return null
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const validationError = validateFile(files[0])
      if (validationError) {
        setError(validationError)
        return
      }
      setError('')
      setSelectedFile(files[0])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const validationError = validateFile(files[0])
      if (validationError) {
        setError(validationError)
        return
      }
      setError('')
      setSelectedFile(files[0])
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setError('')

    try {
      const { data, error } = await uploadDocument(
        selectedFile,
        description || undefined,
        tags.length > 0 ? tags : undefined
      )

      if (error) {
        setError(error.message || 'Der opstod en fejl ved upload')
        toast({
          title: "Upload fejlede",
          description: error.message || 'Der opstod en fejl ved upload',
          variant: "destructive",
        })
      } else {
        // Success toast
        toast({
          title: "Upload succesfuldt!",
          description: `${selectedFile.name} blev uploadet`,
          variant: "default",
        })
        
        // Reset form
        setSelectedFile(null)
        setDescription('')
        setTags([])
        setError('')
        onUploadSuccess?.()
      }
    } catch (err) {
      const errorMsg = 'Der opstod en uventet fejl'
      setError(errorMsg)
      toast({
        title: "Upload fejlede",
        description: errorMsg,
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload size={20} />
          Upload Dokument
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive
                ? 'border-primary bg-primary/5'
                : selectedFile
                ? 'border-green-300 bg-green-50'
                : 'border-gray-300 hover:border-primary'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
            />

            {selectedFile ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center space-x-3"
              >
                <File className="text-primary" size={32} />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedFile(null)
                  }}
                >
                  <X size={16} />
                </Button>
              </motion.div>
            ) : (
              <div>
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Træk og slip filer her
                </p>
                <p className="text-gray-500">eller klik for at vælge filer</p>
                <p className="text-xs text-gray-400 mt-2">
                  PDF, Word, billeder og tekstfiler accepteret
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Beskrivelse (valgfri)</Label>
            <Textarea
              id="description"
              placeholder="Beskriv dokumentet..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>Tags (valgfri)</Label>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Tilføj tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline" size="sm">
                <Plus size={16} />
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer">
                    {tag}
                    <X
                      size={12}
                      className="ml-1 hover:text-red-500"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full nordic-button-primary"
            disabled={!selectedFile || uploading}
          >
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {uploading ? 'Uploader...' : 'Upload Dokument'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default DocumentUpload
