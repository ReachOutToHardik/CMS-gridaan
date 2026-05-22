import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response);
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Query the database for the matching school credentials
    const { data, error } = await supabase
      .from('schools')
      .select('id, admin_email, admin_password, live_url')
      .eq('admin_email', email)
      .single();

    if (error || !data) {
      return addCorsHeaders(NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 }));
    }

    if (data.admin_password !== password) {
      return addCorsHeaders(NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 }));
    }

    // Return the specific school's UUID and live_url for subsequent API calls
    return addCorsHeaders(NextResponse.json({ success: true, schoolId: data.id, liveUrl: data.live_url || '/preview' }));

  } catch (err) {
    console.error('Server Auth POST Error:', err);
    return addCorsHeaders(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
