'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Send, Check, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="min-h-screen bg-[#020202] text-[#F9F9F9] selection:bg-[#F2EFDD] selection:text-black">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[25vh] sm:h-[30vh] md:h-[35vh] min-h-[200px] sm:min-h-[250px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80"
          alt="Contact us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4 sm:px-6 pt-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9F9F9] mb-4 font-[family-name:var(--font-heading)] uppercase">
            {t('title')}
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="pb-20 px-4 sm:px-6 max-w-5xl mx-auto pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0A0A0C] rounded-xl p-6">
              <div className="relative h-40 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80"
                  alt="Our studio"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-[#F2EFDD]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Email</p>
                    <p className="text-sm text-white">info@producer.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-[#F2EFDD]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Phone</p>
                    <p className="text-sm text-white">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-[#F2EFDD]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Location</p>
                    <p className="text-sm text-white">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {status === 'success' ? (
              <div className="bg-[#0A0A0C] rounded-xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F2EFDD] flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-[#020202]" />
                </div>
                <h2 className="text-2xl font-bold text-[#F9F9F9] mb-3 font-[family-name:var(--font-heading)]">
                  {t('successTitle')}
                </h2>
                <p className="text-gray-400">{t('successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#0A0A0C] rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 space-y-6">
                <h2 className="text-2xl font-bold text-[#F9F9F9] mb-6 font-[family-name:var(--font-heading)] uppercase">
                  {t('formTitle')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('name')}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      className="w-full bg-transparent border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors shadow-[0_2px_0_rgba(249,249,249,0.05)]"
                      placeholder={t('namePlaceholder')} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('email')} *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full bg-transparent border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors shadow-[0_2px_0_rgba(249,249,249,0.05)]"
                      placeholder={t('emailPlaceholder')} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('phone')}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full bg-transparent border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors shadow-[0_2px_0_rgba(249,249,249,0.05)]"
                    placeholder={t('phonePlaceholder')} />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('message')} *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                    className="w-full bg-transparent border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors shadow-[0_2px_0_rgba(249,249,249,0.05)] resize-none"
                    placeholder={t('messagePlaceholder')} />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">{t('errorMessage')}</p>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-50">
                  <Send size={14} />
                  {status === 'loading' ? t('sending') : t('send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
