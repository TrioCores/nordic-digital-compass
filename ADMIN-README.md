# Nordweb Admin System

## Oversigt

Det komplette admin system til Nordweb med Supabase authentication og document management.

## 🚀 Funktioner

### ✅ Admin Authentication
- **Sikker login** med email/password
- **Role-based access** (user, admin, owner)
- **Protected routes** med automatisk redirect
- **Session management** med auto-logout

### ✅ Document Management
- **Fil upload** med drag & drop support
- **Document preview** og download
- **Metadata management** (navn, beskrivelse, tags)
- **Avanceret filtrering** og søgning
- **Batch operations** (slet flere filer)

### ✅ Admin Dashboard
- **Intuitivt interface** med tabs
- **Real-time updates** af document liste
- **User management** (kun for owners)
- **System status** og indstillinger

## 🛠️ Installation

### 1. Kør Supabase Migration

Kør dette SQL script i din Supabase SQL Editor:

```sql
-- Se `supabase-migration.sql` filen for komplet setup
```

### 2. Opret Admin Bruger

1. Gå til din Supabase Auth dashboard
2. Opret en ny bruger med din admin email
3. Gå til `user_profiles` tabellen
4. Sæt `role` til `'owner'` for fuld adgang

### 3. Environment Variables

Sikr dig at disse environment variables er sat:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📱 Brug

### Admin Adgang

1. Gå til `/admin` route
2. Log ind med admin credentials
3. Du får adgang til admin panelet

### Upload Dokumenter

1. Gå til "Upload" tab
2. Træk filer til upload området eller klik for at vælge
3. Tilføj metadata (beskrivelse, tags)
4. Klik "Upload Dokument"

### Administrer Dokumenter

1. Gå til "Dokumenter" tab
2. Søg og filtrer dokumenter
3. Download eller slet dokumenter
4. Rediger metadata

## 🔐 Sikkerhed

### Row Level Security (RLS)
- ✅ Alle tabeller har RLS aktiveret
- ✅ Kun admins kan tilgå admin funktioner
- ✅ Owners har fuld kontrol
- ✅ Storage bucket er privat

### Auth Policies
- ✅ Brugere kan kun se egen profil
- ✅ Admins kan se alle profiler
- ✅ Owners kan administrere alle brugere

### File Upload Security
- ✅ Filtype validering
- ✅ Filstørrelse begrænsning (50MB)
- ✅ Virus scanning anbefales

## 🎨 Design

### Komponenter

**Core Components:**
- `AdminLogin.tsx` - Login interface
- `AdminDashboard.tsx` - Hovedpanel
- `ProtectedRoute.tsx` - Route beskyttelse

**Document Components:**
- `DocumentUpload.tsx` - Fil upload
- `DocumentList.tsx` - Document browser

**Hooks:**
- `useAuth.ts` - Authentication logic
- `useDocuments.ts` - Document operations

### Styling
- **Consistent branding** med Nordweb design system
- **Responsive design** for mobil og desktop
- **Accessibility** med proper ARIA labels
- **Smooth animations** med Framer Motion

## 📊 Database Schema

### user_profiles
```sql
id uuid PRIMARY KEY
email text UNIQUE NOT NULL
full_name text
role text CHECK (role IN ('user', 'admin', 'owner'))
created_at timestamp
updated_at timestamp
```

### documents
```sql
id uuid PRIMARY KEY
name text NOT NULL
original_name text NOT NULL
file_path text NOT NULL
file_size bigint NOT NULL
file_type text NOT NULL
uploaded_by uuid REFERENCES auth.users(id)
description text
tags text[]
created_at timestamp
updated_at timestamp
uploaded_at timestamp
```

## 🚀 Deployment

### Production Checklist

- [ ] Kør Supabase migration
- [ ] Opret admin bruger
- [ ] Test alle funktioner
- [ ] Sæt op backup rutiner
- [ ] Monitor logs

### Environment Setup

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## 🔧 Maintenance

### Almindelige Opgaver

**Brugeradministration:**
- Tildel admin rolle til nye brugere
- Fjern adgang fra tidligere ansatte
- Monitor brugeraktivitet

**Document Management:**
- Ryd op i gamle filer
- Backup vigtige dokumenter
- Monitor storage forbrug

**System Vedligeholdelse:**
- Check logs regelmæssigt
- Update dependencies
- Monitor performance

## 📝 Changelog

### v1.0.0 (Initial Release)
- ✅ Basic admin authentication
- ✅ Document upload/download
- ✅ User role management
- ✅ Protected routes

### Kommende Features
- [ ] Bulk file operations
- [ ] Advanced user management
- [ ] Audit logging
- [ ] Email notifications
- [ ] API endpoints

## 🤝 Support

Ved problemer eller spørgsmål:

1. Check denne README
2. Review Supabase logs
3. Kontakt development team

---

**Lavet med ❤️ af Nordweb Team**
