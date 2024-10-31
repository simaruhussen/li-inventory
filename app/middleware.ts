// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value;

//   if (!token) {
//     const url = new URL('/login', req.url);
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/home/:path*'], // Protect the /home route and any sub-routes
// };
