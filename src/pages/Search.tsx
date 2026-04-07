import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/guides';
import { Search as SearchIcon, FileText } from 'lucide-react';

export default function Search() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(' ');
    const matches = [];

    for (const cat of categories) {
      for (const guide of cat.guides) {
        const textToSearch = `${guide.title} ${guide.content} ${guide.steps?.join(' ')}`.toLowerCase();
        
        // Simple scoring based on matches
        let score = 0;
        for (const term of searchTerms) {
          if (textToSearch.includes(term)) score++;
        }

        if (score > 0) {
          matches.push({ guide, category: cat, score });
        }
      }
    }

    return matches.sort((a, b) => b.score - a.score);
  }, [query]);

  return (
    <div className="p-4 space-y-4 min-h-full bg-stone-50 dark:bg-stone-950">
      <div className="sticky top-0 pt-4 pb-2 bg-stone-50 dark:bg-stone-950 z-10">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-stone-400" />
          </div>
          <input
            type="search"
            className="block w-full p-4 pr-10 text-sm text-stone-900 border border-stone-200 rounded-2xl bg-white focus:ring-green-500 focus:border-green-500 dark:bg-stone-900 dark:border-stone-800 dark:placeholder-stone-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 shadow-sm"
            placeholder="ابحث عن مهارات، أدوات، إسعافات..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {query && results.length === 0 && (
          <div className="text-center py-10 text-stone-500 dark:text-stone-400">
            لا توجد نتائج مطابقة لبحثك
          </div>
        )}

        {results.map(({ guide, category }) => (
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
        ))}
      </div>
    </div>
  );
}
