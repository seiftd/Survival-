import { Outlet, NavLink } from 'react-router-dom';
import { Home, Search, Star, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-stone-50 dark:bg-stone-950">
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 w-full bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex justify-around items-center h-16 px-2 z-50">
        <NavItem to="/" icon={<Home size={24} />} label="الرئيسية" />
        <NavItem to="/search" icon={<Search size={24} />} label="بحث" />
        <NavItem to="/emergency" icon={<AlertTriangle size={24} />} label="طوارئ" className="text-red-600 dark:text-red-500" />
        <NavItem to="/favorites" icon={<Star size={24} />} label="المفضلة" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, className }: { to: string, icon: ReactNode, label: string, className?: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx(
        "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors",
        isActive 
          ? (className || "text-green-700 dark:text-green-500") 
          : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100",
        className && !isActive && "opacity-70"
      )}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
