'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to studio
    router.push('/studio');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block">Sovereign Atelier Access</span>
          <h1 className="font-serif text-3xl text-[#141413]">Artist Sign In</h1>
          <p className="font-sans text-xs text-[#716E68]">Enter your credentials to enter your creator workspace.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="elena@atelier.art"
              className="w-full bg-[#FAF8F5] border border-[#E7E4DF] px-3 py-2 text-xs font-sans text-[#141413] focus:outline-none focus:border-[#C25E3E]"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="w-full bg-[#FAF8F5] border border-[#E7E4DF] px-3 py-2 text-xs font-sans text-[#141413] focus:outline-none focus:border-[#C25E3E]"
            />
          </div>
          <Button type="submit" variant="primary" size="md" className="w-full">
            Enter Studio
          </Button>
        </form>

        <div className="pt-4 border-t border-[#E7E4DF] text-center font-sans text-xs text-[#716E68]">
          <span>New artist? </span>
          <Link href="/register" className="text-[#C25E3E] underline underline-offset-4">Claim your sovereign handle</Link>
        </div>
      </Card>
    </div>
  );
}
