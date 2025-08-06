import { useState, useEffect } from 'react'
import { useDocuments, type Document } from '@/hooks/useDocuments'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { 
  File, 
  Download, 
  Trash2, 
  Search, 
  Eye, 
  Edit, 
  FileText,
  Image,
  FileType
} from 'lucide-react'
import { motion } from 'framer-motion'

interface DocumentListProps {
  refreshTrigger?: number
}

const DocumentList = ({ refreshTrigger }: DocumentListProps) => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  const { getDocuments, deleteDocument, getDownloadUrl, loading } = useDocuments()

  useEffect(() => {
    fetchDocuments()
  }, [refreshTrigger])

  useEffect(() => {
    filterDocuments()
  }, [documents, searchQuery, selectedTag])

  const fetchDocuments = async () => {
    const { data, error } = await getDocuments()
    if (error) {
      setError('Kunne ikke hente dokumenter')
    } else if (data) {
      setDocuments(data)
    }
  }

  const filterDocuments = () => {
    let filtered = documents

    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.original_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedTag) {
      filtered = filtered.filter(doc =>
        doc.tags?.includes(selectedTag)
      )
    }

    setFilteredDocuments(filtered)
  }

  const handleDelete = async (document: Document) => {
    setDeleteLoading(document.id)
    try {
      const { error } = await deleteDocument(document.id, document.file_path)
      if (error) {
        setError('Kunne ikke slette dokumentet')
      } else {
        setDocuments(documents.filter(doc => doc.id !== document.id))
      }
    } catch (err) {
      setError('Der opstod en fejl ved sletning')
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleDownload = async (document: Document) => {
    try {
      const { data } = await getDownloadUrl(document.file_path)
      if (data) {
        const link = window.document.createElement('a')
        link.href = data.publicUrl
        link.download = document.original_name
        link.click()
      }
    } catch (err) {
      setError('Kunne ikke downloade dokumentet')
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image size={20} className="text-green-600" />
    } else if (fileType.includes('pdf')) {
      return <FileText size={20} className="text-red-600" />
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <FileType size={20} className="text-blue-600" />
    } else {
      return <File size={20} className="text-gray-600" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const allTags = Array.from(
    new Set(documents.flatMap(doc => doc.tags || []))
  ).sort()

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Henter dokumenter...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <File size={20} />
          Dokumenter ({filteredDocuments.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Søg i dokumenter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                Alle
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Documents Table */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-8">
            <File className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">
              {searchQuery || selectedTag ? 'Ingen dokumenter matcher søgningen' : 'Ingen dokumenter uploaded endnu'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dokument</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Størrelse</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Uploadet</TableHead>
                  <TableHead className="text-right">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document, index) => (
                  <motion.tr
                    key={document.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {getFileIcon(document.file_type)}
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-sm text-gray-500">{document.original_name}</p>
                          {document.description && (
                            <p className="text-xs text-gray-400 mt-1">{document.description}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {document.file_type.split('/')[1]?.toUpperCase() || 'FILE'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatFileSize(document.file_size)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {document.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(document.uploaded_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(document)}
                          title="Download"
                        >
                          <Download size={16} />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={deleteLoading === document.id}
                              title="Slet"
                            >
                              <Trash2 size={16} className="text-red-600" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Slet dokument</AlertDialogTitle>
                              <AlertDialogDescription>
                                Er du sikker på at du vil slette "{document.name}"? 
                                Denne handling kan ikke fortrydes.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuller</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(document)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Slet
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DocumentList
