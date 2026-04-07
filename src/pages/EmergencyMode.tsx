import { Link } from 'react-router-dom';
import { AlertTriangle, Droplet, Flame, HeartPulse } from 'lucide-react';

export default function EmergencyMode() {
  return (
    <div className="min-h-full bg-red-600 text-white p-6 flex flex-col">
      <header className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <AlertTriangle size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">وضع الطوارئ</h1>
        <p className="text-red-100">وصول سريع للمعلومات الحيوية</p>
      </header>

      <div className="flex-1 flex flex-col justify-center gap-4 max-w-md w-full mx-auto">
        <Link 
          to="/guide/fa-wounds" 
          className="flex items-center p-5 bg-white text-red-700 rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          <div className="p-3 bg-red-100 rounded-full ml-4">
            <HeartPulse size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">نزيف أو إصابة</h2>
            <p className="text-sm text-red-600/80">خطوات الإسعاف الأولي</p>
          </div>
        </Link>

        <Link 
          to="/guide/water-purify" 
          className="flex items-center p-5 bg-white text-blue-700 rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          <div className="p-3 bg-blue-100 rounded-full ml-4">
            <Droplet size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">تنقية المياه</h2>
            <p className="text-sm text-blue-600/80">كيف تجعل الماء صالحاً للشرب</p>
          </div>
        </Link>

        <Link 
          to="/guide/fire-start" 
          className="flex items-center p-5 bg-white text-orange-700 rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          <div className="p-3 bg-orange-100 rounded-full ml-4">
            <Flame size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">إشعال النار</h2>
            <p className="text-sm text-orange-600/80">للتدفئة أو طلب المساعدة</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
