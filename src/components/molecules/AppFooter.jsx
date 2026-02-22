import React from 'react';
import { useTranslation } from 'react-i18next';
export default function AppFooter() {
  const { t } = useTranslation();
  return (
    <footer className="w-full py-8 text-center bg-transparent mt-auto relative z-20">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] select-none">
        {t('footer.mdm_ops')}
      </span>
    </footer>
  );
}
