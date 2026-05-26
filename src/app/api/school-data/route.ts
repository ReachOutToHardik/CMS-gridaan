import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { initialData } from '@/lib/data';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let schoolId = searchParams.get('schoolId');

    if (!schoolId) {
      // Try to detect school automatically via Referer or Origin headers
      const referer = request.headers.get('referer');
      const origin = request.headers.get('origin');
      let targetDomain = '';

      if (referer) {
        try {
          targetDomain = new URL(referer).hostname;
        } catch (_) {}
      } else if (origin) {
        try {
          targetDomain = new URL(origin).hostname;
        } catch (_) {}
      }

      if (targetDomain && targetDomain !== 'localhost' && targetDomain !== '127.0.0.1') {
        const { data: schools, error: dbError } = await supabase
          .from('schools')
          .select('id, data, live_url');

        if (!dbError && schools) {
          const matchedSchool = schools.find((s: any) => {
            if (!s.live_url) return false;
            try {
              const schoolHost = new URL(s.live_url).hostname;
              return schoolHost === targetDomain || targetDomain.endsWith(schoolHost);
            } catch (_) {
              return s.live_url.includes(targetDomain);
            }
          });

          if (matchedSchool) {
            console.log(`Auto-detected school matching domain: ${targetDomain} (ID: ${matchedSchool.id})`);
            return addCorsHeaders(NextResponse.json(matchedSchool.data));
          }
        }
      }

      // Fallback: If no schoolId and domain detection didn't match, return the first school in DB
      const { data: schools, error: dbError } = await supabase
        .from('schools')
        .select('data')
        .limit(1);

      if (!dbError && schools && schools.length > 0) {
        console.log('No schoolId provided, defaulting to the first school in database.');
        return addCorsHeaders(NextResponse.json(schools[0].data));
      }

      return addCorsHeaders(NextResponse.json({ error: 'Missing schoolId parameter.' }, { status: 400 }));
    }

    const { data, error } = await supabase
      .from('schools')
      .select('data')
      .eq('id', schoolId)
      .single();

    if (error || !data) {
      console.log('Fetching initial data (not found in DB)');
      return addCorsHeaders(NextResponse.json(initialData));
    }

    return addCorsHeaders(NextResponse.json(data.data));
  } catch (err) {
    console.error('Server GET Error:', err);
    return addCorsHeaders(NextResponse.json(initialData));
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');

    if (!schoolId) {
      return addCorsHeaders(NextResponse.json({ error: 'Missing schoolId parameter.' }, { status: 400 }));
    }

    const body = await request.json();
    
    const { data, error } = await supabase
      .from('schools')
      .update({ data: body })
      .eq('id', schoolId)
      .select();

    if (error) {
      console.error('Supabase Update Error:', error);
      return addCorsHeaders(NextResponse.json({ error: error.message }, { status: 500 }));
    }

    return addCorsHeaders(NextResponse.json(data ? data[0].data : { success: true }));
  } catch (err: any) {
    console.error('Server POST Exception:', err);
    return addCorsHeaders(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
