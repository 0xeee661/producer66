'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NewsletterSignup() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mb-8">
      <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4 font-[family-name:var(--font-heading)]">
        {t('title')}
      </h4>
      <p className="text-gray-500 text-sm mb-4">{t('description')}</p>

      {status === 'success' ? (
        <div className="flex items-center gap-2 text-[#F2EFDD] text-sm font-bold">
          <Check size={16} />
          {t('success')}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            required
            className="flex-1 bg-transparent border-2 border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors shadow-[0_2px_0_rgba(249,249,249,0.05)]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#F2EFDD] text-[#020202] border-2 border-[#020202] rounded-full w-10 h-10 flex items-center justify-center shadow-[0_2px_0_#020202] hover:translate-y-px hover:shadow-[0_1px_0_#020202] transition-all disabled:opacity-50 flex-shrink-0"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">{t('error')}</p>
      )}
    </div>
  );
}
