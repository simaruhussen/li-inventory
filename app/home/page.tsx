
 import { headers } from 'next/headers';
 import { redirect } from 'next/navigation';

 export default function HomePage() {
   const token = headers().get('cookie')?.includes('token');

  if (!token) {
     redirect('/login'); 
   }

  return <div>Welcome to the Home Page!</div>;
 }
