import { getTranslations } from 'next-intl/server';
import { syncCurrentUser } from '@/lib/user-sync';
import { redirect } from 'next/navigation';
import { CheckCircle, Database, User as UserIcon, Mail, Calendar, Shield } from 'lucide-react';

export default async function ProfilePage() {
  const t = await getTranslations('profile');

  // Esta función sincroniza el usuario de Clerk con nuestra DB
  // Si no hay usuario logueado, devuelve null

  console.log("HERE!!")
  const dbClient = await syncCurrentUser();

  console.log("HERE1!!")

  if (!dbClient) {
    redirect('/sign-in');
  }

  console.log("HERE2!!")

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-zinc-400">{t('subtitle')}</p>
        </div>

        {/* Database Sync Status Card */}
        <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 mb-8 flex items-center gap-4">
          <div className="bg-green-500/20 p-2 rounded-full">
            <Database className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-green-400">{t('dbStatus')}</h3>
            <p className="text-sm text-green-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {t('dbConnected')}
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                <span className="text-zinc-500">DB ID:</span>
                <span className="text-green-400 font-bold">{dbClient.id}</span>
              </p>
              <p className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                <span className="text-zinc-500">Clerk ID:</span>
                <span className="text-zinc-300">{dbClient.clerk_id}</span>
              </p>
            </div>
          </div>

          {/* Registration Type Badge */}
          <div className="flex flex-col items-end">
            <span className="text-xs text-zinc-500 mb-1">Tipo de Registro</span>
            {dbClient.registration_type === 'google' ? (
              <div className="bg-blue-500/20 border border-blue-500/50 px-3 py-1 rounded-full flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-bold text-blue-300">Google</span>
              </div>
            ) : (
              <div className="bg-purple-500/20 border border-purple-500/50 px-3 py-1 rounded-full flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-300" />
                <span className="text-sm font-bold text-purple-300">Email</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="md:col-span-1 bg-zinc-900 border border-zinc-800 rounded-lg p-6 h-fit">
            <div className="flex flex-col items-center mb-6">
              {dbClient.imageUrl ? (
                <img
                  src={dbClient.imageUrl}
                  alt={dbClient.firstName || 'User'}
                  className="w-24 h-24 rounded-full border-2 border-zinc-700 mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                  <UserIcon className="w-10 h-10 text-zinc-500" />
                </div>
              )}
              <h2 className="text-xl font-bold">
                {dbClient.first_name} {dbClient.second_name}
              </h2>
              <p className="text-zinc-500">@{dbClient.username || 'user'}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-300 break-all">{dbClient.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-300">
                  {t('joined')} {new Date(dbClient.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-300">
                  {dbClient.registration_type === 'google' ? 'OAuth Google' : 'Email + Password'}
                </span>
              </div>
            </div>

            {/* Password Security Note */}
            <div className="mt-6 p-3 bg-zinc-950 border border-zinc-700 rounded text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-green-400 mb-1">Seguridad</p>
                  <p>
                    {dbClient.registration_type === 'google'
                      ? 'Tu cuenta está protegida por Google OAuth. No necesitas contraseña.'
                      : 'Tu contraseña está encriptada de forma segura por Clerk y nunca se almacena en texto plano.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6">{t('recentOrders')}</h3>

            <div className="text-center py-12 text-zinc-500 bg-zinc-950/50 rounded border border-zinc-800/50 border-dashed">
              <p>{t('noOrders')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
