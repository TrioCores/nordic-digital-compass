-- Check storage bucket and policies
-- Don't delete - just verify and update

-- Check if bucket exists
SELECT 
    id, 
    name, 
    public, 
    file_size_limit, 
    allowed_mime_types
FROM storage.buckets 
WHERE id = 'documents';

-- If bucket doesn't exist, create it
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'documents',
    'documents',
    false,
    52428800, -- 50MB limit
    array[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'text/csv',
        'application/json'
    ]
) ON CONFLICT (id) DO UPDATE SET
    allowed_mime_types = EXCLUDED.allowed_mime_types,
    file_size_limit = EXCLUDED.file_size_limit;

-- Check existing files in bucket
SELECT name, created_at FROM storage.objects 
WHERE bucket_id = 'documents' 
ORDER BY created_at DESC;

-- Check storage policies
SELECT * FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects';
