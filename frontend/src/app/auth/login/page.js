'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      router.push('/');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 px-4">
      <h1 className="text-3xl font-bold uppercase tracking-tighter mb-8 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-zinc-200 p-3 focus:outline-none focus:border-black transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-zinc-200 p-3 focus:outline-none focus:border-black transition-colors"
            required
          />
        </div>
        <Button type="submit" className="w-full py-6">Login</Button>
      </form>
      <div className="mt-6 text-center text-sm text-zinc-500">
        Don't have an account? <Link href="/auth/signup" className="text-black font-bold hover:underline">Sign up</Link>
      </div>
    </div>
  );
}
