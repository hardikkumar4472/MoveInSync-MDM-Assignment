import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, Languages } from 'lucide-react';
import { cn } from '../../lib/utils';
export default function LanguageSwitcher({ dark = false }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'kn', label: 'ಕನ್ನಡ' }
  ];
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-colors p-2 rounded-xl",
          dark 
            ? "text-white/60 hover:text-white hover:bg-white/10" 
            : "text-slate-500 hover:text-ms-green hover:bg-slate-50"
        )}
      >
        <Languages size={16} />
        {i18n.language.toUpperCase()} 
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button> 
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "absolute right-0 mt-2 w-32 rounded-2xl shadow-xl overflow-hidden z-[100] border",
              dark 
                ? "bg-slate-900/90 backdrop-blur-xl border-white/10" 
                : "bg-white border-slate-100"
            )}
          >
            {languages.map((lang) => (
              <button 
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  "w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer",
                  i18n.language === lang.code 
                    ? "bg-ms-green text-white" 
                    : dark 
                      ? "text-white/60 hover:bg-white/5 hover:text-white" 
                      : "text-slate-500 hover:bg-slate-50"
                )}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
