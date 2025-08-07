-- Tilføj tags kolonne til documents tabellen
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Opret index for bedre performance ved tag søgning
CREATE INDEX IF NOT EXISTS idx_documents_tags ON public.documents USING GIN (tags);

-- Eksempel på at tilføje nogle test tags (valgfrit)
-- UPDATE public.documents SET tags = ARRAY['kontrakt', 'vigtig'] WHERE file_type = 'application/pdf';
-- UPDATE public.documents SET tags = ARRAY['billede', 'logo'] WHERE file_type LIKE 'image/%';
