import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import introVideo from '../assets/Video_Generation_Request.mp4';
import AppFooter from './molecules/AppFooter';
import LanguageSwitcher from './molecules/LanguageSwitcher';
import Typography from './atoms/Typography';
export default function IntroPage({ onComplete }) {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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
          src={introVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      <div className="absolute top-8 right-8 z-50">
        <LanguageSwitcher dark={true} />
      </div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl w-full px-6 text-center space-y-10"
      >
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <Typography variant="h1" className="text-white drop-shadow-2xl">
              MoveInSync <br/>
              <span className="text-ms-green not-italic bg-clip-text text-transparent bg-gradient-to-r from-ms-green to-emerald-400 text-xl lg:text-3xl block mt-6 tracking-normal font-bold py-2 leading-relaxed">
                {t('intro.subtitle')}
              </span>
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Typography variant="body" className="text-white/80 max-w-3xl mx-auto drop-shadow-lg lg:text-2xl">
              {t('intro.description')}
            </Typography>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="pt-6">
           <button 
             onClick={onComplete}
             className="group relative px-12 py-6 bg-ms-green text-white rounded-full font-black text-sm uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(16,185,129,0.4)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 border border-white/20 mx-auto overflow-hidden cursor-pointer"
           >
             <span className="relative z-10">{t('intro.getStarted')}</span>
             <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
           </button>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full">
        <AppFooter />
      </div>
    </div>
  );
}
