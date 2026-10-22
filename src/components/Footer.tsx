import React from 'react';
import { Mail, MapPin, Phone, Heart } from 'lucide-react';
import { DOCTOR_INFO, RoutePath } from '../data/siteData';

interface FooterProps {
  onNavigate: (route: RoutePath) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: RoutePath) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C2A2E] text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Doctor Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                <img
                  src="/assets/logo.png"
                  alt={DOCTOR_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">{DOCTOR_INFO.name}</h2>
                <p className="text-xs font-semibold text-teal-300">{DOCTOR_INFO.title}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {DOCTOR_INFO.credentialsShort}
            </p>
            <p className="text-xs text-slate-400">
              جلسات أونلاين مرنة ومشفرة بالكامل باللغتين العربية والإنجليزية.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm font-medium text-slate-300">
              <li>
                <a href="/" onClick={(e) => handleNav(e, '/')} className="hover:text-white transition-colors">
                  الرئيسية (/index)
                </a>
              </li>
              <li>
                <a href="/why-me" onClick={(e) => handleNav(e, '/why-me')} className="hover:text-white transition-colors">
                  لماذا أنا؟ (/why-me)
                </a>
              </li>
              <li>
                <a href="/services" onClick={(e) => handleNav(e, '/services')} className="hover:text-white transition-colors">
                  الخدمات (/services)
                </a>
              </li>
              <li>
                <a href="/products" onClick={(e) => handleNav(e, '/products')} className="hover:text-white transition-colors">
                  المنتجات والباقات (/products)
                </a>
              </li>
              <li>
                <a href="/pricing" onClick={(e) => handleNav(e, '/pricing')} className="hover:text-white transition-colors">
                  الأسعار (/pricing)
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => handleNav(e, '/faq')} className="hover:text-white transition-colors">
                  الأسئلة الشائعة (/faq)
                </a>
              </li>
              <li>
                <a href="/booking" onClick={(e) => handleNav(e, '/booking')} className="hover:text-white transition-colors">
                  إتمام الحجز (/booking)
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="hover:text-white transition-colors">
                  اتصل بنا (/contact)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-3.5 text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-teal-300">
                  <Mail className="w-4 h-4" />
                </span>
                <a
                  href={`mailto:${DOCTOR_INFO.email}`}
                  className="hover:text-teal-300 transition-colors font-mono text-xs sm:text-sm"
                >
                  {DOCTOR_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center shrink-0 text-emerald-300">
                  <Phone className="w-4 h-4" />
                </span>
                <a
                  href={`https://wa.me/${DOCTOR_INFO.phoneRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="hover:text-emerald-300 transition-colors tabular-nums font-semibold"
                >
                  {DOCTOR_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-amber-300">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>{DOCTOR_INFO.location}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-4">تابعنا</h3>
            <div className="flex items-center gap-3 mb-4">
              <a
                href={DOCTOR_INFO.socials.tiktok.url}
                target="_blank"
                rel="noreferrer"
                aria-label="حساب تيك توك"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white font-bold text-xs transition-colors"
              >
                TikTok
              </a>
              <a
                href={DOCTOR_INFO.socials.instagram.url}
                target="_blank"
                rel="noreferrer"
                aria-label="حساب انستغرام"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white font-bold text-xs transition-colors"
              >
                IG
              </a>
              <a
                href={DOCTOR_INFO.socials.facebook.url}
                target="_blank"
                rel="noreferrer"
                aria-label="حساب فيسبوك"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white font-bold text-xs transition-colors"
              >
                FB
              </a>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              تابعنا للمزيد من النصائح والمحتوى النفسي المفيد والتوعية العلمية المستمرة.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>صُمم بـ</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 inline" />
            <span>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</span>
          </div>
          <div dir="ltr" className="tabular-nums">
            © {new Date().getFullYear()} Dr. Maan Al-Khafaf Clinic
          </div>
        </div>
      </div>
    </footer>
  );
};
