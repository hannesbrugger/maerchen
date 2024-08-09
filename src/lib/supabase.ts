import { createClient } from '@supabase/supabase-js';

// Stelle sicher, dass die Umgebungsvariablen vorhanden sind
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Fehlende Supabase-Konfigurations-Umgebungsvariablen');
}

// Erstelle den Supabase-Client mit den Umgebungsvariablen
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
