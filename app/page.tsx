// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // This function will redirect to the login page when the app starts
  redirect('/login');

  return (
    <main>
      {/* Optionally, you can put loading indicators or messages here if needed */}
    </main>
  );
}
