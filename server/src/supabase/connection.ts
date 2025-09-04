import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'

dotenv.config()

const supabaseURL = process.env.SUPABASE_URL
const anonKEY = process.env.ANON_KEY

if(!supabaseURL){
    throw 'supabase url not found'
}
if(!anonKEY){
    throw 'anon key not found'
}

const supabase = createClient(supabaseURL, anonKEY)

export default supabase