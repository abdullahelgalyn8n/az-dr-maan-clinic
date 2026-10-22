import React, { useState } from 'react';
import { Calendar, Menu, ShoppingBag, X } from 'lucide-react';
import { DOCTOR_INFO, RoutePath } from '../data/siteData';

interface NavbarProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath, params?: { itemId?: string }) => void;
  basketCount: number;
  onOpenBasket: () => void;
}

const NAV_ITEMS: { label: string; path: RoutePath }[] = [
  { label: 'الرئيسية', path: '/' },
  { label: 'لماذا أنا؟', path: '/why-me' },
  { label: 'الخدمات', path: '/services' },
  { label: 'المنتجات والباقات', path: '/products' },
  { label: 'الأسعار', path: '/pricing' },
  { label: 'الأسئلة الشائعة', path: '/faq' },
  { label: 'اتصل بنا', path: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  basketCount,
  onOpenBasket,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: RoutePath) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
        {/* Zone 1: Brand Title */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2.5 text-slate-900 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#F0F7F7] border border-[#B8D8D8] flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="/assets/logo.png"
              alt={DOCTOR_INFO.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0">
            {DOCTOR_INFO.name}
          </span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden lg:flex items-center gap-6 text-sm font-bold"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#145A5D] border-[#145A5D]'
                    : 'text-slate-700 border-transparent hover:text-[#145A5D] hover:border-slate-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Basket */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBasket}
            aria-label={`سلة الباقات والمنتجات (${basketCount})`}
            className="relative inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:border-slate-400 transition-colors text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#145A5D]" />
            <span className="hidden sm:inline">السلة</span>
            <span className="tabular-nums font-extrabold text-[#145A5D]">({basketCount})</span>
          </button>

          <a
            href="/booking"
            onClick={(e) => handleLinkClick(e, '/booking')}
            className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#B8862D] hover:bg-[#9E7122] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>احجز الآن</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 shadow-lg">
          <nav aria-label="قائمة الجوال" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-[#EAF4F4] text-[#145A5D]'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
