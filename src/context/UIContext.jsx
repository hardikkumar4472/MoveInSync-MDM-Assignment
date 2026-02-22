import { createContext, useContext, useState, useEffect, useCallback } from 'react';
const UIContext = createContext();
export function UIProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'admin';
  });
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'inventory';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSchedulingForm, setShowSchedulingForm] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setShowSchedulingForm(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const handleRoleChange = useCallback((roleId) => {
    setUserRole(roleId);
    if (roleId === 'analyst') setShowSchedulingForm(false);
    if (roleId !== 'admin' && activeTab === 'audit') setActiveTab('inventory');
  }, [activeTab]);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmLabel: 'OK',
    onConfirm: null,
    showCancel: false,
    cancelLabel: 'Cancel'
  });
  const showAlert = useCallback((config) => {
    setAlert({
      isOpen: true,
      title: config.title || 'Notification',
      message: config.message || '',
      type: config.type || 'info',
      confirmLabel: config.confirmLabel || 'OK',
      onConfirm: config.onConfirm || null,
      showCancel: config.showCancel || false,
      cancelLabel: config.cancelLabel || 'Cancel'
    });
    window.history.pushState({ type: 'alert' }, '');
  }, []);
  const closeAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  }, []);
  const openSchedulingForm = useCallback(() => {
    setShowSchedulingForm(true);
    setIsMobileMenuOpen(false);
    window.history.pushState({ type: 'schedulingForm' }, '');
  }, []);

  const closeSchedulingForm = useCallback(() => {
    setShowSchedulingForm(false);
  }, []);
  useEffect(() => {
    const handlePopState = (e) => {
      if (alert.isOpen) {
        closeAlert();
      } else if (showSchedulingForm) {
        setShowSchedulingForm(false);
      } else if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showSchedulingForm, isMobileMenuOpen, alert.isOpen, closeAlert]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      window.history.pushState({ type: 'mobileMenu' }, '');
    }
  }, [isMobileMenuOpen]);
  const value = { darkMode, toggleDarkMode, userRole, setUserRole: handleRoleChange, activeTab, setActiveTab: handleTabChange, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, showSchedulingForm, openSchedulingForm, closeSchedulingForm, alert, showAlert, closeAlert
  };
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
