-- Update allowed file types in storage bucket
UPDATE storage.buckets 
SET allowed_mime_types = array[
    -- PDF files
    'application/pdf',
    
    -- Word documents
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    
    -- Excel files
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    
    -- PowerPoint files
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    
    -- Text files
    'text/plain',
    'text/csv',
    'application/json',
    'application/xml',
    
    -- Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/icon',

    -- Video files
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/avi',
    'video/mpeg',
    'video/quicktime',
    'video/gif',


    -- Archives
    'application/zip',
    'application/x-rar-compressed',
    
    -- Other
    'application/rtf'
]
WHERE id = 'documents';
