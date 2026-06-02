/**
 * src/lib/supabase.js
 *
 * Setup:
 * 1. npm install @supabase/supabase-js
 * 2. Replace SUPABASE_URL and SUPABASE_ANON_KEY below
 *    (from Supabase Dashboard → Project Settings → API)
 *
 * Supabase table required for HospitalManager:
 * ─────────────────────────────────────────────
 * Table name: hospitals
 * Columns:
 *   id       uuid        primary key default gen_random_uuid()
 *   name     text        not null
 *   city     text        not null
 *   type     text        default 'RS Umum'
 *   phone    text        default '-'
 *   rating   numeric     default 4.5
 *   user_id  uuid        references auth.users(id) on delete cascade
 *   created_at timestamptz default now()
 *
 * RLS Policies (enable RLS on the table):
 *   SELECT  → auth.uid() = user_id
 *   INSERT  → auth.uid() = user_id
 *   UPDATE  → auth.uid() = user_id
 *   DELETE  → auth.uid() = user_id
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = 'https://drlvdrsoxrbengfrreoc.supabase.co'; // ← replace
const SUPABASE_ANON_KEY = 'sb_publishable_HCXyA-qBkkcS7IbIA-aMkg_u-oX1mMy';                       // ← replace

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);