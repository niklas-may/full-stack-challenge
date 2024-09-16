import { NextRequest, NextResponse } from 'next/server';
import { queryClient } from './lib/query-client';
import { authUserOptions } from './hooks/query/auth';

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // if (pathname.startsWith('/game')) {
  //   const user = queryClient.getQueryData(authUserOptions.queryKey)
  //   console.log("user ", user)
  //   if (!user) {
  //     return NextResponse.redirect(`${origin}/auth/login`);
  //   }
  // }

  return NextResponse.next();
}