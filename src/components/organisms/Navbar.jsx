import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import LanguageSwitcher from '../molecules/LanguageSwitcher';
import Button from '../atoms/Button';
import { useUI } from '../../context/UIContext';
export default function Navbar({ roles, onLogout }) {
  const { t } = useTranslation();
  const { userRole, setUserRole, activeTab, setActiveTab, darkMode, toggleDarkMode, isMobileMenuOpen, toggleMobileMenu, showSchedulingForm, openSchedulingForm, showAlert
  } = useUI();
  const handleLogout = () => {
    showAlert({
      type: 'warning',
      title: 'End Session',
      message: 'Are you sure you want to logged out?',
      confirmLabel: 'Logout',
      showCancel: true,
      cancelLabel: 'Stay Connected',
      onConfirm: onLogout
    });
  };
  return (
    <nav className="bg-white/30 dark:bg-slate-900/40 backdrop-blur-3xl border-b border-slate-100/50 dark:border-slate-800/50 fixed top-0 left-0 right-0 z-50 h-16 md:h-24 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto pl-4 md:pl-8 lg:pl-12 pr-4 md:pr-8 lg:pr-12 lg:-translate-x-12 xl:-translate-x-20 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-shrink-0">
          <button 
            className="flex items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-green focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-xl" 
            onClick={() => setActiveTab('inventory')}
            aria-label="MoveInSync Home"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-ms-green rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg shadow-ms-green/20">
              M
            </div>
            <div className="whitespace-nowrap text-left hidden xs:block">
              <h1 className="font-black text-lg md:text-xl leading-tight tracking-tighter text-slate-900 dark:text-white italic">MoveInSync</h1>
              <p className="text-[9px] md:text-[10px] text-ms-green font-black tracking-widest uppercase mt-0.5 leading-normal">{t('footer.mdm_ops')}</p>
            </div>
          </button>
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0" role="list">
            <TopNavItem
              label={t('nav.dashboard')}
              active={(activeTab === 'inventory' || activeTab === 'audit') && !showSchedulingForm}
              onClick={() => setActiveTab('inventory')}
            />
            <TopNavItem
              label={t('nav.monitoring')}
              active={activeTab === 'monitor'}
              onClick={() => setActiveTab('monitor')}
            />
            <div className={cn(userRole === 'analyst' && "invisible pointer-events-none")}>
              <TopNavItem
                label={t('nav.scheduling')}
                active={showSchedulingForm}
                onClick={openSchedulingForm}
              />
            </div>
            <div className={cn(userRole !== 'admin' && "invisible pointer-events-none")}>
              <TopNavItem
                label={t('nav.auditLogs')}
                active={activeTab === 'audit'}
                onClick={() => setActiveTab('audit')}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
          <div className="hidden xl:flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-100 dark:border-slate-800 shadow-inner" role="group" aria-label="Select user role">
            {roles && roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setUserRole(r.id)}
                aria-pressed={userRole === r.id}
                className={cn(
                  "w-24 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] transition-all border cursor-pointer flex-shrink-0 relative overflow-hidden",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ms-green",
                  userRole === r.id 
                    ? "bg-white dark:bg-slate-700 text-ms-green shadow-sm border-slate-200 dark:border-slate-600 scale-[1.02]" 
                    : "bg-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white border-transparent"
                )}
              >
                {r.label}
                {userRole === r.id && (
                  <motion.div layoutId="activeRoleGlow" className="absolute inset-0 bg-ms-green/5 blur-md" />
                )}
              </button>
            ))}
          </div>

          {userRole !== 'analyst' && (
            <Button 
              variant="primary"
              onClick={openSchedulingForm}
              className="hidden sm:flex"
              ariaLabel="Request a fleet update"
            >
              {t('nav.requestUpdate')}
            </Button>
          )}
          <div className="h-10 w-[1px] bg-slate-100 dark:bg-slate-800 hidden sm:block" />  
          <button 
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 md:p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-300 hover:text-ms-green transition-all shadow-sm flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-ms-green"
          >
            {darkMode ? <Sun size={18} className="md:w-5 md:h-5" /> : <Moon size={18} className="md:w-5 md:h-5" />}
          </button>

          <div className="flex-shrink-0">
            <LanguageSwitcher dark={darkMode} />
          </div>

          <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800 hidden sm:block" />

          <button 
            onClick={handleLogout}
            aria-label="Logout"
            className="hidden sm:flex p-2 md:p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-all shadow-sm items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <LogOut size={18} className="md:w-5 md:h-5" />
          </button>
          <button 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden p-2 md:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm focus:ring-2 focus:ring-ms-green"
          >
            {isMobileMenuOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 md:top-24 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl z-40 p-6 flex flex-col gap-6 lg:hidden"
          >
            <div className="flex flex-col gap-4" role="list">
              <TopNavItem
                label={t('nav.dashboard')}
                active={(activeTab === 'inventory' || activeTab === 'audit') && !showSchedulingForm}
                onClick={() => setActiveTab('inventory')}
              />
              <TopNavItem
                label={t('nav.monitoring')}
                active={activeTab === 'monitor'}
                onClick={() => setActiveTab('monitor')}
              />
              {userRole !== 'analyst' && (
                <TopNavItem
                  label={t('nav.scheduling')}
                  active={showSchedulingForm}
                  onClick={openSchedulingForm}
                />
              )}
              {userRole === 'admin' && (
                <TopNavItem
                  label={t('nav.auditLogs')}
                  active={activeTab === 'audit'}
                  onClick={() => setActiveTab('audit')}
                />
              )}
            </div>

            <div className="h-px w-full bg-slate-50 dark:bg-slate-800" />
            
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Access Level</p>
              <div className="grid grid-cols-1 gap-2" role="group">
                {roles && roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setUserRole(r.id)}
                    aria-pressed={userRole === r.id}
                    className={cn(
                      "w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ms-green",
                      userRole === r.id 
                        ? "bg-white dark:bg-slate-700 text-ms-green shadow-sm border-slate-200 dark:border-slate-600" 
                        : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent shadow-inner"
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-2">
               <div className="flex flex-col gap-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Theme</p>
                 <button onClick={toggleDarkMode} className="w-full py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-3 text-slate-600 dark:text-slate-300">
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    <span className="text-xs font-black uppercase tracking-widest">{darkMode ? 'Light' : 'Dark'}</span>
                 </button>
               </div>
               <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Language</p>
                  <LanguageSwitcher dark={darkMode} />
               </div>
            </div>

            <Button 
              variant="custom"
              onClick={handleLogout}
              className="w-full py-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-xl"
              ariaLabel="Logout"
            >
              <div className="flex items-center justify-center gap-3">
                <LogOut size={18} />
                <span className="font-black text-xs uppercase tracking-[0.2em]">{t('nav.logout')}</span>
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
function TopNavItem({ label, active = false, onClick }) {
  return (
    <button 
      onClick={onClick} 
      role="listitem"
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative text-[11px] font-black uppercase tracking-widest transition-all px-4 py-2 cursor-pointer whitespace-nowrap group rounded-xl", 
        active ? "text-ms-green" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
      )}
    >
      <span className="relative z-10 py-1 inline-block">{label}</span>
      <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800/50 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all rounded-xl -z-0" />
      {active && (
        <motion.div 
          layoutId="navPill" 
          className="absolute inset-0 bg-ms-green/5 dark:bg-ms-green/10 border border-ms-green/20 rounded-xl -z-0" 
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )} 
      {active && (
        <motion.div 
          layoutId="navUnderline" 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-ms-green rounded-full shadow-[0_4px_10px_rgba(67,176,42,0.4)]" 
        />
      )}
    </button>
  );
}
