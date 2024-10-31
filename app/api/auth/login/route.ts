import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Make the actual login request to your backend
    const response = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Return the token and role in the response (no cookies)
      return NextResponse.json({ token: data.token, role: data.role });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message || 'Invalid credentials' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in /api/auth/login route:', error);
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
  }
}
