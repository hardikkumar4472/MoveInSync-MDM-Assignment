import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, ArrowRight, ShieldCheck, Globe, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import loginVideo from '../assets/EV_Car_Pickup_Video_Generation (1).mp4';
import AppFooter from './molecules/AppFooter';
import LanguageSwitcher from './molecules/LanguageSwitcher';
import Typography from './atoms/Typography';
export default function LoginPage({ onLogin }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      if (email === 'fail@gmail.com') {
        setError("NETWORK_FAILURE: Connection to MDM API lost. Please verify your VPN status.");
        setIsLoading(false);
      } else if (email === 'testing@gmail.com' && password === 'testing123') {
        onLogin();
      } else {
        setError(t('login.invalid'));
        setIsLoading(false);
      }
    }, 1500);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 25, stiffness: 100 }
    }
  };
  return (
    <div className="h-screen w-full relative overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-60 scale-105"
          src={loginVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/80" />
      </div>
      <div className="absolute top-8 right-8 z-50">
        <LanguageSwitcher dark={true} />
      </div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md px-6"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="relative overflow-hidden group md:border md:border-white/20 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md md:backdrop-blur-sm bg-black/5 md:bg-transparent"
        >
          <div className="mb-10 text-center drop-shadow-lg">
            <Typography variant="h2" className="text-white not-italic">{t('login.title')}</Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-2">{t('login.email')}</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-ms-green transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.emailPlaceholder')}
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white placeholder:text-white/20 focus:bg-white/10 focus:ring-4 focus:ring-ms-green/5 focus:border-ms-green outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-2">{t('login.password')}</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-ms-green transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white placeholder:text-white/20 focus:bg-white/10 focus:ring-4 focus:ring-ms-green/5 focus:border-ms-green outline-none transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] font-bold text-rose-500 uppercase tracking-widest text-center py-2"
              >
                {error}
              </motion.p>
            )}

            <div className="flex justify-center mb-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('testing@gmail.com');
                  setPassword('testing123');
                }}
                className="text-[10px] font-black text-ms-green/80 uppercase tracking-widest hover:text-ms-green transition-colors px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 cursor-pointer"
              >
                {t('login.autofill')}
              </button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-5 bg-ms-green text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-ms-green/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 border border-white/20 relative overflow-hidden group/btn cursor-pointer",
                isLoading && "opacity-80 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">{t('login.authorize')}</span>
                  <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </>
              )}
            </button>
          </form>
        </motion.div>

      </motion.div>
      <div className="absolute bottom-0 left-0 w-full">
        <AppFooter />
      </div>
    </div>
  );
}
