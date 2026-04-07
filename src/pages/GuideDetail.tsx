import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/guides';
import { ChevronRight, Star, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useFavorites } from '../hooks/useStore';

export default function GuideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Find the guide and its parent category
  let guide = null;
  let category = null;
  
  for (const cat of categories) {
    const found = cat.guides.find(g => g.id === id);
    if (found) {
      guide = found;
      category = cat;
      break;
    }
  }

  if (!guide || !category) {
    return <div className="p-8 text-center">الدليل غير موجود</div>;
  }

  const isFav = isFavorite(guide.id);

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-stone-950">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-100 dark:border-stone-800">
        <button onClick={() => navigate(-1)} className="p-2 -mr-2 text-stone-600 dark:text-stone-300">
          <ChevronRight size={24} />
        </button>
        <div className="flex items-center gap-2">
          <category.icon size={18} className={`text-${category.color.replace('bg-', '')}`} />
          <span className="text-sm font-medium text-stone-500 dark:text-stone-400">{category.title}</span>
        </div>
        <button 
          onClick={() => toggleFavorite(guide.id)} 
          className="p-2 -ml-2 text-amber-500"
        >
          <Star size={24} fill={isFav ? "currentColor" : "none"} />
        </button>
      </header>

      <div className="p-5 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">{guide.title}</h1>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{guide.content}</p>
        </div>

        {guide.warnings && guide.warnings.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-500 mb-2 font-bold">
              <AlertTriangle size={20} />
              <h2>تحذيرات هامة</h2>
            </div>
            <ul className="space-y-2">
              {guide.warnings.map((warning, idx) => (
                <li key={idx} className="text-red-800 dark:text-red-400 text-sm flex items-start gap-2">
                  <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {guide.steps && guide.steps.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-600 dark:text-green-500" />
              الخطوات
            </h2>
            <div className="space-y-4">
              {guide.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 bg-stone-50 dark:bg-stone-900 p-4 rounded-xl border border-stone-100 dark:border-stone-800">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold shrink-0 ${category.color}`}>
                    {idx + 1}
                  </div>
                  <p className="text-stone-800 dark:text-stone-200 pt-1 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
