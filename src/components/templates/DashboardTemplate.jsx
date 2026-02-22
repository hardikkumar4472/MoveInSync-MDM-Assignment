import { cn } from "../../lib/utils";
import AppFooter from "../molecules/AppFooter";

export default function DashboardTemplate({navbar, sidebar, children, footer,className 
}) {
  return (
    <div className="min-h-screen bg-ms-light dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {navbar}
      <main className={cn("max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 pt-24 md:pt-40", className)}>
        {children}
      </main>
      {footer || <AppFooter />}
    </div>
  );
}
