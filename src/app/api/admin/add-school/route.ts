import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response);
}

export async function POST(request: Request) {
  try {
    // Basic master key protection to prevent public creation of schools
    const authHeader = request.headers.get('authorization');
    const masterKey = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'; // Using existing env as fallback master key
    
    if (authHeader !== `Bearer ${masterKey}`) {
      return addCorsHeaders(NextResponse.json({ error: 'Unauthorized. Invalid master key.' }, { status: 401 }));
    }

    const body = await request.json();
    const { admin_email, admin_password, school_name } = body;

    if (!admin_email || !admin_password || !school_name) {
      return addCorsHeaders(NextResponse.json({ error: 'Missing required fields: admin_email, admin_password, school_name.' }, { status: 400 }));
    }

    // Insert new school. Supabase with pgcrypto will auto-generate the UUID if we use gen_random_uuid(),
    // but since we don't have RLS or full schema control here safely, we can generate a UUID locally or let Supabase do it.
    // If the 'id' column defaults to uuid_generate_v4(), we don't need to pass it.
    // However, if it's text, we should generate one using crypto API.
    
    const newId = crypto.randomUUID();

    const { data, error } = await supabase
      .from('schools')
      .insert({
        id: newId,
        admin_email,
        admin_password,
        school_name,
        data: {} // Empty initial JSONB data
      })
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return addCorsHeaders(NextResponse.json({ error: error.message }, { status: 500 }));
    }

    return addCorsHeaders(NextResponse.json({ success: true, school: data[0] }));

  } catch (err) {
    console.error('Server POST Exception:', err);
    return addCorsHeaders(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
