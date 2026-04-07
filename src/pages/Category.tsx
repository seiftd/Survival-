import { useParams, Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/guides';
import { ChevronRight, FileText } from 'lucide-react';

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = categories.find(c => c.id === id);

  if (!category) {
    return <div className="p-8 text-center">القسم غير موجود</div>;
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className={`p-6 text-white ${category.color}`}>
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-white/90 hover:text-white">
          <ChevronRight size={20} />
          <span>رجوع</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <category.icon size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{category.title}</h1>
            <p className="text-white/80 text-sm mt-1">{category.description}</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-3 flex-1 bg-stone-50 dark:bg-stone-950">
        {category.guides.map(guide => (
          <Link 
            key={guide.id}
            to={`/guide/${guide.id}`}
            className="flex items-center p-4 bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 active:bg-stone-50 dark:active:bg-stone-800 transition-colors"
          >
            <div className={`p-2 rounded-lg text-white ml-4 ${category.color}`}>
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-stone-900 dark:text-stone-100">{guide.title}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">{guide.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
