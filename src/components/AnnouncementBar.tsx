'use client';

import { useTranslations } from 'next-intl';

export default function AnnouncementBar() {
  const t = useTranslations('announcement');

  return (
    <div className="bg-white text-[#020202] py-2.5 px-4 sm:px-6 text-center z-[60] fixed top-0 left-0 right-0">
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
        {t('text')}
      </p>
    </div>
  );
}
