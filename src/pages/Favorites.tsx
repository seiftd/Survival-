import { Link } from 'react-router-dom';
import { categories } from '../data/guides';
import { useFavorites } from '../hooks/useStore';
import { FileText, Star } from 'lucide-react';

export default function Favorites() {
  const { favorites } = useFavorites();

  const favoriteGuides = [];
  for (const cat of categories) {
    for (const guide of cat.guides) {
      if (favorites.includes(guide.id)) {
        favoriteGuides.push({ guide, category: cat });
      }
    }
  }

  return (
    <div className="p-4 space-y-4 min-h-full bg-stone-50 dark:bg-stone-950">
      <header className="pt-4 pb-2">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Star className="text-amber-500" fill="currentColor" />
          الأدلة المفضلة
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
          تم حفظها للوصول السريع بدون إنترنت
        </p>
      </header>

      <div className="space-y-3">
        {favoriteGuides.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 border-dashed">
            <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-stone-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">لا توجد مفضلة</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              اضغط على أيقونة النجمة في أي دليل لحفظه هنا
            </p>
          </div>
        ) : (
          favoriteGuides.map(({ guide, category }) => (
            <Link 
              key={guide.id}
              to={`/guide/${guide.id}`}
              className="flex items-center p-4 bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800"
            >
              <div className={`p-2 rounded-lg text-white ml-4 ${category.color}`}>
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-stone-900 dark:text-stone-100">{guide.title}</h3>
                  <span className="text-[10px] px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 rounded-full">
                    {category.title}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">{guide.content}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
