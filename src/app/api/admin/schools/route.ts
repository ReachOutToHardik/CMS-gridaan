import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response);
}

// Check master key
const verifyMasterKey = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  const masterKey = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
  return authHeader === `Bearer ${masterKey}`;
};

export async function GET(request: Request) {
  try {
    if (!verifyMasterKey(request)) {
      return addCorsHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
    }

    const { data, error } = await supabase
      .from('schools')
      .select('id, admin_email, admin_password, school_name, live_url, data');

    if (error) {
      return addCorsHeaders(NextResponse.json({ error: error.message }, { status: 500 }));
    }

    // Extract phone number from data JSONB for the dashboard view
    const formattedData = data.map((school: any) => ({
      id: school.id,
      admin_email: school.admin_email,
      admin_password: school.admin_password,
      school_name: school.school_name,
      live_url: school.live_url || '/preview',
      phone: school.data?.phone || 'N/A'
    }));

    return addCorsHeaders(NextResponse.json({ success: true, schools: formattedData }));
  } catch (err) {
    console.error('Server GET Error:', err);
    return addCorsHeaders(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}

export async function PUT(request: Request) {
  try {
    if (!verifyMasterKey(request)) {
      return addCorsHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
    }

    const { id, live_url } = await request.json();

    if (!id || !live_url) {
      return addCorsHeaders(NextResponse.json({ error: 'Missing required fields: id, live_url' }, { status: 400 }));
    }

    const { error } = await supabase
      .from('schools')
      .update({ live_url })
      .eq('id', id);

    if (error) {
      return addCorsHeaders(NextResponse.json({ error: error.message }, { status: 500 }));
    }

    return addCorsHeaders(NextResponse.json({ success: true }));
  } catch (err) {
    console.error('Server PUT Error:', err);
    return addCorsHeaders(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
