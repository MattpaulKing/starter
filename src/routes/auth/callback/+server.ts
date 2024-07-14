import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals: { db } }) => {
  const code = url.searchParams.get('code') as string;
  let next = url.searchParams.get('next')
  if (!next) { next = "/" }
  if (code) {
    const { error: sessionErr } = await db
      .auth
      .exchangeCodeForSession(code)
    if (!sessionErr) {
      redirect(302, `${next}`);
    }
  }
  redirect(302, "/auth/code-error")
};
