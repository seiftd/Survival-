import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Compass as CompassIcon, AlertCircle } from 'lucide-react';

export default function CompassPage() {
  const navigate = useNavigate();
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [needsPermission, setNeedsPermission] = useState(false);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let compassHeading = (event as any).webkitCompassHeading || (event.alpha !== null ? Math.abs(event.alpha - 360) : null);
      if (compassHeading !== null && !isNaN(compassHeading)) {
        setHeading(compassHeading);
      }
    };

    const requestAccess = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceOrientationEvent as any).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          } else {
            setError('تم رفض إذن الوصول للبوصلة');
          }
        } catch (err) {
          setError('حدث خطأ أثناء طلب الإذن');
        }
      } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      }
    };

    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      setNeedsPermission(true);
    } else {
      requestAccess();
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
    };
  }, []);

  const handleRequestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setNeedsPermission(false);
          window.addEventListener('deviceorientation', (e) => {
            let compassHeading = (e as any).webkitCompassHeading || (e.alpha !== null ? Math.abs(e.alpha - 360) : null);
            if (compassHeading !== null && !isNaN(compassHeading)) {
              setHeading(compassHeading);
            }
          }, true);
        } else {
          setError('تم رفض إذن الوصول للبوصلة');
        }
      } catch (err) {
        setError('حدث خطأ أثناء طلب الإذن');
      }
    }
  };

  const getDirection = (degree: number) => {
    if (degree >= 337.5 || degree < 22.5) return 'شمال';
    if (degree >= 22.5 && degree < 67.5) return 'شمال شرق';
    if (degree >= 67.5 && degree < 112.5) return 'شرق';
    if (degree >= 112.5 && degree < 157.5) return 'جنوب شرق';
    if (degree >= 157.5 && degree < 202.5) return 'جنوب';
    if (degree >= 202.5 && degree < 247.5) return 'جنوب غرب';
    if (degree >= 247.5 && degree < 292.5) return 'غرب';
    if (degree >= 292.5 && degree < 337.5) return 'شمال غرب';
    return '';
  };

  return (
    <div className="flex flex-col min-h-full bg-stone-900 text-white">
      <header className="flex items-center p-4 border-b border-stone-800">
        <button onClick={() => navigate(-1)} className="p-2 -mr-2 text-stone-300">
          <ChevronRight size={24} />
        </button>
        <h1 className="text-xl font-bold mr-2">البوصلة</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {error ? (
          <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-2xl border border-red-900/50">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-80" />
            <p>{error}</p>
            <p className="text-sm mt-2 opacity-70">تأكد من أن جهازك يدعم مستشعر الاتجاه</p>
          </div>
        ) : needsPermission ? (
          <div className="text-center">
            <CompassIcon size={64} className="mx-auto mb-6 text-stone-500" />
            <p className="mb-6 text-stone-300">يحتاج التطبيق إلى إذن للوصول إلى مستشعر الاتجاه</p>
            <button 
              onClick={handleRequestPermission}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              منح الإذن
            </button>
          </div>
        ) : heading !== null ? (
          <div className="text-center w-full max-w-sm">
            <div className="text-4xl font-bold mb-2 text-green-500">
              {Math.round(heading)}°
            </div>
            <div className="text-2xl font-medium mb-12 text-stone-300">
              {getDirection(heading)}
            </div>
            
            <div className="relative w-64 h-64 mx-auto">
              {/* Compass Background */}
              <div className="absolute inset-0 rounded-full border-4 border-stone-700 bg-stone-800 shadow-inner flex items-center justify-center">
                <div className="absolute top-2 text-red-500 font-bold text-xl">ش</div>
                <div className="absolute bottom-2 text-stone-400 font-bold text-xl">ج</div>
                <div className="absolute right-2 text-stone-400 font-bold text-xl">ش</div>
                <div className="absolute left-2 text-stone-400 font-bold text-xl">غ</div>
              </div>
              
              {/* Compass Needle */}
              <div 
                className="absolute inset-0 transition-transform duration-200 ease-out"
                style={{ transform: `rotate(${-heading}deg)` }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[60px] border-b-red-500"></div>
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[60px] border-t-white"></div>
                </div>
              </div>
              
              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-stone-900 rounded-full border-2 border-stone-600 z-10"></div>
            </div>
          </div>
        ) : (
          <div className="text-center text-stone-400 animate-pulse">
            <CompassIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>جاري معايرة البوصلة...</p>
          </div>
        )}
      </div>
    </div>
  );
}
