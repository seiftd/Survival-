import { Link } from 'react-router-dom';
import { categories } from '../data/guides';
import { Moon, Sun, Compass, CheckSquare } from 'lucide-react';
import { useTheme } from '../hooks/useStore';

export default function Home() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center pt-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">دليل البقاء</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">استعد لأي طارئ</p>
        </div>
        <div className="flex gap-2">
          <Link to="/checklist" className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            <CheckSquare size={20} />
          </Link>
          <Link to="/compass" className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            <Compass size={20} />
          </Link>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-stone-800 dark:text-stone-200">الأقسام الرئيسية</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(cat => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-stone-900 shadow-sm border border-stone-100 dark:border-stone-800 active:scale-95 transition-transform"
            >
              <div className={`p-3 rounded-full text-white mb-3 ${cat.color}`}>
                <cat.icon size={28} />
              </div>
              <h3 className="font-medium text-stone-900 dark:text-stone-100 text-center">{cat.title}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 text-center mt-1 line-clamp-2">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
