// // app/home/page.tsx
// import { headers } from 'next/headers';
// import { redirect } from 'next/navigation';

// export default function HomePage() {
//   const token = headers().get('cookie')?.includes('token');

//   if (!token) {
//     redirect('/login'); // Redirect unauthenticated users to the login page
//   }

//   return <div>Welcome to the Home Page!</div>;
// }
