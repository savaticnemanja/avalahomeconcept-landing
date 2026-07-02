import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { saveUpload, saveVideoUpload, isVideoType } from '@/lib/uploads';

export const runtime = 'nodejs';
// Transcoding large videos can take a while; allow a generous budget.
export const maxDuration = 300;

export async function POST(request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let form;
  try {
    form = await request.formData();
  } catch (err) {
    return NextResponse.json(
      { error: `Could not read upload. ${err?.message ?? 'Malformed request body.'}` },
      { status: 400 },
    );
  }
  const file = form.get('file');

  try {
    const result = isVideoType(file?.type)
      ? await saveVideoUpload(file)
      : await saveUpload(file);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message ?? 'Upload failed.' }, { status: 400 });
  }
}
