import { getTranslations } from 'next-intl/server';
import { syncCurrentUser } from '@/lib/user-sync';
import { redirect } from 'next/navigation';
import { Shield } from 'lucide-react';

export default async function PanelPage() {
  const t = await getTranslations('panel');
  const dbClient = await syncCurrentUser();

  if (!dbClient || dbClient.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-600/20 p-2 rounded-full">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-zinc-400">{t('subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">{t('users')}</h3>
            <p className="text-zinc-400 text-sm">{t('usersDesc')}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">{t('beats')}</h3>
            <p className="text-zinc-400 text-sm">{t('beatsDesc')}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">{t('orders')}</h3>
            <p className="text-zinc-400 text-sm">{t('ordersDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
