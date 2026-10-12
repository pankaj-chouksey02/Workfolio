'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/studio');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="font-mono text-[10px] uppercase text-[#C25E3E] tracking-widest font-semibold block">Monograph Protocol</span>
          <h1 className="font-serif text-3xl text-[#141413]">Claim Sovereign Atelier</h1>
          <p className="font-sans text-xs text-[#716E68]">Reserve your custom handle and initiate your studio archive.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Desired Handle</label>
            <div className="flex items-center bg-[#FAF8F5] border border-[#E7E4DF] px-3 py-2 text-xs font-mono">
              <span className="text-[#716E68] select-none pr-1">atelier.art/@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
                placeholder="yourname"
                className="w-full bg-transparent text-[#141413] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#716E68] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="artist@atelier.art"
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
            Establish Atelier
          </Button>
        </form>

        <div className="pt-4 border-t border-[#E7E4DF] text-center font-sans text-xs text-[#716E68]">
          <span>Already registered? </span>
          <Link href="/login" className="text-[#C25E3E] underline underline-offset-4">Sign in to your studio</Link>
        </div>
      </Card>
    </div>
  );
}
