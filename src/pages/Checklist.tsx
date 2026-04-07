import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CheckSquare, Square, Trash2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

const defaultItems: ChecklistItem[] = [
  { id: '1', text: 'حقيبة إسعافات أولية', completed: false },
  { id: '2', text: 'مصباح يدوي وبطاريات إضافية', completed: false },
  { id: '3', text: 'مخزون ماء (3 لتر للشخص يومياً)', completed: false },
  { id: '4', text: 'طعام معلب غير قابل للتلف', completed: false },
  { id: '5', text: 'أداة متعددة الاستخدامات (سكين سويسري)', completed: false },
  { id: '6', text: 'أعواد ثقاب مقاومة للماء أو ولاعة', completed: false },
  { id: '7', text: 'بطانية طوارئ حرارية', completed: false },
  { id: '8', text: 'صافرة لطلب المساعدة', completed: false },
];

export default function Checklist() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('survival_checklist');
    return saved ? JSON.parse(saved) : defaultItems;
  });
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('survival_checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    setItems([
      ...items,
      { id: Date.now().toString(), text: newItem.trim(), completed: false }
    ]);
    setNewItem('');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const resetList = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين القائمة؟')) {
      setItems(defaultItems);
    }
  };

  const completedCount = items.filter(i => i.completed).length;
  const progress = items.length === 0 ? 0 : Math.round((completedCount / items.length) * 100);

  return (
    <div className="flex flex-col min-h-full bg-stone-50 dark:bg-stone-950">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -mr-2 text-stone-600 dark:text-stone-300">
            <ChevronRight size={24} />
          </button>
          <h1 className="text-xl font-bold mr-2 text-stone-900 dark:text-stone-100">قائمة الطوارئ</h1>
        </div>
        <button onClick={resetList} className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
          إعادة تعيين
        </button>
      </header>

      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h2 className="font-bold text-stone-900 dark:text-stone-100">مستوى الاستعداد</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">{completedCount} من {items.length} عنصر جاهز</p>
            </div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-500">{progress}%</span>
          </div>
          <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2.5">
            <div 
              className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={addItem} className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="إضافة عنصر جديد..."
            className="flex-1 p-3 text-sm border border-stone-200 rounded-xl bg-white focus:ring-green-500 focus:border-green-500 dark:bg-stone-900 dark:border-stone-800 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 shadow-sm"
          />
          <button 
            type="submit"
            disabled={!newItem.trim()}
            className="px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-stone-300 dark:disabled:bg-stone-700 text-white rounded-xl font-medium transition-colors"
          >
            إضافة
          </button>
        </form>

        <div className="space-y-2">
          {items.map(item => (
            <div 
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                item.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/50' 
                  : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800'
              }`}
            >
              <button 
                onClick={() => toggleItem(item.id)}
                className="flex items-center gap-3 flex-1 text-right"
              >
                {item.completed ? (
                  <CheckSquare size={24} className="text-green-600 dark:text-green-500 shrink-0" />
                ) : (
                  <Square size={24} className="text-stone-400 dark:text-stone-600 shrink-0" />
                )}
                <span className={`text-sm ${item.completed ? 'text-stone-500 dark:text-stone-400 line-through' : 'text-stone-800 dark:text-stone-200'}`}>
                  {item.text}
                </span>
              </button>
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
