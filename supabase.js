import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bnnuvpeapsyqkikbzwdc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubnV2cGVhcHN5cWtpa2J6d2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODE1NDgsImV4cCI6MjA3MTQ1NzU0OH0.f34Ql0wbAiaO8UsuTI2HfLHb753UgYRaW2sMB41g13M";

export const supabase = createClient(supabaseUrl, supabaseKey);
