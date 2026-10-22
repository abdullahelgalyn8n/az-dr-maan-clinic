import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Gift,
  Globe,
  GraduationCap,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Star,
  User,
  Users,
  Video,
} from 'lucide-react';
import {
  CurrencyCode,
  DOCTOR_INFO,
  QUALIFICATIONS_LIST,
  RoutePath,
  SESSION_PLANS,
  THERAPEUTIC_PRODUCTS,
} from '../data/siteData';
import {
  BookingFormInput,
  formatPrice,
  resolveBookableItem,
  validateBookingForm,
  validateContactForm,
  ValidationErrors,
} from '../utils/bookingLogic';
import {
  BottomCtaBanner,
  ChallengesSection,
  FaqAccordionSection,
  JourneySection,
  MethodologySection,
  PricingCardsSection,
  PrivacySection,
  WhyMeSection,
} from './SharedSections';
import { ProductsCatalogSection } from './ProductsCatalogSection';

export interface ConfirmedBookingRecord extends BookingFormInput {
  referenceCode: string;
  createdAt: string;
  itemTitle: string;
  priceFormatted: string;
}

/* ============================================================================
 * 1. HOME PAGE (/)
 * ========================================================================== */
export const HomePage: React.FC<{
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onNavigate: (route: RoutePath, params?: { itemId?: string }) => void;
  onAddToBasket: (id: string) => void;
  basketIds: string[];
}> = ({ currency, onCurrencyChange, onNavigate, onAddToBasket, basketIds }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-[#EAF4F4] via-[#F4F8F8] to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Right Content Column in RTL */}
            <div className="lg:col-span-7 space-y-5 text-right">
              <p className="text-xs sm:text-sm font-extrabold text-[#926214]">
                أول 30 دقيقة مجانًا · جلسات أونلاين بالعربية والإنجليزية
              </p>

              <h1
                className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0F172A] leading-[1.2] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                لتفهم ما تمرّ به بدقة{' '}
                <span className="text-[#145A5D] block mt-1">وتبدأ بخطة واضحة</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium max-w-2xl">
                {DOCTOR_INFO.heroDescription}
              </p>

              {/* Unboxed Metadata with clean separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-extrabold text-[#145A5D] pt-1">
                <span>سرية مهنية تامة</span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span>خطة علاجية واضحة</span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span>جلسات فردية وللأزواج والمراهقين</span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span>باقات وأدلة علاجية تطبيقية</span>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/booking', { itemId: 'session-free-intro' })}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#B8862D] hover:bg-[#9E7122] text-white font-extrabold text-sm sm:text-base shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-5 h-5" />
                  <span>احجز جلستك المجانية</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/products')}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>تصفح الباقات والمنتجات</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] border border-slate-300 font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5 text-[#145A5D]" />
                  <span>تواصل معنا</span>
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-700 font-bold pt-1">
                <span>الجلسة المجانية تشمل:</span>
                <span className="inline-flex items-center gap-1.5 text-[#0F172A]">
                  <MessageSquare className="w-4 h-4 text-[#145A5D]" />
                  كتابة
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 text-[#0F172A]">
                  <Video className="w-4 h-4 text-[#145A5D]" />
                  فيديو (Zoom)
                </span>
              </div>
            </div>

            {/* Left Portrait Column in RTL */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white border-2 border-[#B8D8D8] rounded-3xl p-4 sm:p-5 shadow-lg max-w-sm w-full">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/4.5]">
                  <img
                    src="/assets/dr-maan-portrait.png"
                    alt={DOCTOR_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-4 pb-1 text-center space-y-1.5">
                  <h2 className="text-xl font-extrabold text-[#0F172A]">{DOCTOR_INFO.name}</h2>
                  <p className="text-xs sm:text-sm font-bold text-[#145A5D]">
                    {DOCTOR_INFO.titleFull}
                  </p>
                  <p className="text-xs text-slate-700 font-medium">
                    عضو الكلية الملكية للأطباء النفسيين في بريطانيا
                  </p>
                  <div
                    className="flex items-center justify-center gap-1 pt-1"
                    aria-label="تقييم 5 من 5 نجوم"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-[#D99B26] text-[#D99B26]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Me Section */}
      <WhyMeSection onNavigate={onNavigate} showMoreLink />

      {/* Interactive Challenges Section */}
      <ChallengesSection
        onBookItem={(itemId) => onNavigate('/booking', { itemId })}
      />

      {/* 4-Step Journey Section */}
      <JourneySection />

      {/* Integrated Methodology Section */}
      <MethodologySection />

      {/* Featured Products & Therapeutic Bundles */}
      <ProductsCatalogSection
        currency={currency}
        isPreview
        onAddToBasket={onAddToBasket}
        onBookProductNow={(productId) => onNavigate('/booking', { itemId: productId })}
        onNavigate={onNavigate}
        basketIds={basketIds}
      />

      {/* Pricing Cards Section */}
      <PricingCardsSection
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        onBookPlan={(planId) => onNavigate('/booking', { itemId: planId })}
      />

      {/* Privacy & Confidentiality */}
      <PrivacySection />

      {/* FAQ Preview */}
      <FaqAccordionSection limit={5} onNavigate={onNavigate} />

      {/* Bottom CTA Banner */}
      <BottomCtaBanner onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 2. WHY ME PAGE (/why-me)
 * ========================================================================== */
export const WhyMePage: React.FC<{
  onNavigate: (route: RoutePath, params?: { itemId?: string }) => void;
}> = ({ onNavigate }) => {
  return (
    <div>
      {/* Page Hero */}
      <section className="py-14 lg:py-20 bg-gradient-to-b from-[#EAF4F4] to-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-extrabold text-[#145A5D]">
            لماذا أنا؟ · السيرة المهنية والاعتماد البريطاني
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            خبرة <span className="text-[#145A5D]">تتجاوز عشرين عامًا</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto">
            في العمل النفسي المهني وخبرة عملية إكلينيكية واسعة داخل المملكة المتحدة.
          </p>
        </div>
      </section>

      {/* Core 4 Pillars */}
      <WhyMeSection />

      {/* Qualifications & Philosophy Split Cards (Matching why-me_9439d124.png) */}
      <section className="py-16 lg:py-20 bg-[#F4F8F8] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Qualifications Card */}
            <div className="bg-white border border-slate-300 rounded-2xl p-7 sm:p-9 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#145A5D] text-white flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#0F172A] mb-5">
                  المؤهلات والعضويات المهنية
                </h2>
                <ul className="space-y-3.5">
                  {QUALIFICATIONS_LIST.map((q, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#145A5D] mt-2.5 shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>المقر المهني: المملكة المتحدة (UK)</span>
                <span>لغات الجلسات: العربية والإنجليزية</span>
              </div>
            </div>

            {/* Philosophy in Therapy Card */}
            <div className="bg-white border border-slate-300 rounded-2xl p-7 sm:p-9 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#926214] border border-[#F59E0B]/40 flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#0F172A] mb-5">
                  فلسفتي في العلاج النفسي
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  <p>
                    أؤمن بأن كل شخص يستحق الدعم والمساعدة للوصول إلى أفضل نسخة من نفسه. أعمل على بناء علاقة علاجية آمنة قائمة على الثقة، السرية التامة، والاحترام المتبادل دون إصدار أحكام.
                  </p>
                  <p>
                    أستخدم مقاربة علاجية مرنة تُفصّل حسب احتياج كل حالة، مع التركيز على بناء مهارات عملية تُحسّن الحياة اليومية وتُقلّل من احتمالية الانتكاس على المدى البعيد.
                  </p>
                  <p>
                    سواء كنت تفضل التحدث المباشر عبر الفيديو أو التعبير الكتابي المنظم، نصمم معًا خطة واضحة تمنحك الفهم الدقيق لما تمر به والأدوات العلمية لتجاوزه.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => onNavigate('/booking', { itemId: 'session-free-intro' })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white text-sm font-extrabold transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>ابدأ بجلستك التمهيدية المجانية مع د. معن</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomCtaBanner onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 3. SERVICES PAGE (/services)
 * ========================================================================== */
export const ServicesPage: React.FC<{
  onNavigate: (route: RoutePath, params?: { itemId?: string }) => void;
}> = ({ onNavigate }) => {
  return (
    <div>
      {/* Page Hero */}
      <section className="py-14 lg:py-20 bg-gradient-to-b from-[#EAF4F4] to-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-extrabold text-[#926214]">
            الخدمات العلاجية · منهجيات قائمة على الدليل العلمي
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            جلسات علاج نفسي <span className="text-[#145A5D]">أونلاين</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto">
            بالعربية والإنجليزية بمنهجيات علمية معتمدة (CBT, DBT, ACT) للبالغين والمراهقين والأزواج.
          </p>
        </div>
      </section>

      {/* Interactive Challenges & Target Audience */}
      <ChallengesSection
        onBookItem={(itemId) => onNavigate('/booking', { itemId })}
      />

      {/* Session Types & Formats (Matching services_c559a644.png) */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] text-center mb-10">
              أنواع الجلسات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-7 text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#145A5D] text-white flex items-center justify-center mx-auto mb-5">
                    <User className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">جلسات فردية</h3>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    للبالغين والمراهقين، تركز على احتياجاتك الشخصية وأهدافك العلاجية في بيئة سرية وآمنة.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/booking', { itemId: 'session-60-min' })}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white text-xs font-extrabold cursor-pointer"
                >
                  احجز جلسة فردية
                </button>
              </div>

              <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-7 text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] text-[#926214] border border-[#F59E0B]/40 flex items-center justify-center mx-auto mb-5">
                    <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">جلسات للأزواج</h3>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    لتحسين التواصل وحل المشكلات الزوجية وتقوية العلاقة وإعادة بناء التفاهم المشترك.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/booking', { itemId: 'prod-couples-6' })}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white text-xs font-extrabold cursor-pointer"
                >
                  احجز استشارة زوجية
                </button>
              </div>

              <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-7 text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#EAF4F4] text-[#145A5D] border border-[#B8D8D8] flex items-center justify-center mx-auto mb-5">
                    <HeartHandshake className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">جلسات للمراهقين</h3>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    دعم نفسي متخصص للمراهقين وفق الضوابط المهنية البريطانية المناسبة وبالتنسيق مع الأسرة.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/booking', { itemId: 'prod-teens-5' })}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white text-xs font-extrabold cursor-pointer"
                >
                  احجز جلسة للمراهقين
                </button>
              </div>
            </div>
          </div>

          {/* Available Session Formats */}
          <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-8">
            <h3 className="text-xl font-extrabold text-[#0F172A] text-center mb-8">
              صيغ الجلسات المتاحة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="w-11 h-11 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center mx-auto mb-3">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-[#0F172A]">فيديو (Zoom)</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                  جلسة فيديو مباشرة عبر منصة آمنة ومشفرة
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] text-[#926214] flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-[#0F172A]">كتابة</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                  تواصل مكتوب مباشر لمن يفضلون هذا النمط في التعبير
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="w-11 h-11 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-[#0F172A]">مرونة في المواعيد</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                  مواعيد صباحية ومسائية مرنة تناسب توقيتك المحلي
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JourneySection />
      <MethodologySection />
      <BottomCtaBanner onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 4. PRODUCTS & BUNDLES PAGE (/products)
 * ========================================================================== */
export const ProductsPage: React.FC<{
  currency: CurrencyCode;
  onAddToBasket: (id: string) => void;
  onNavigate: (route: RoutePath, params?: { itemId?: string }) => void;
  basketIds: string[];
}> = ({ currency, onAddToBasket, onNavigate, basketIds }) => {
  return (
    <div>
      {/* Page Hero */}
      <section className="py-14 lg:py-20 bg-gradient-to-b from-[#EAF4F4] to-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-extrabold text-[#145A5D]">
            المنتجات والباقات العلاجية · حلول عملية متكاملة
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            الباقات العلاجية <span className="text-[#145A5D]">والأدلة التطبيقية</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto">
            اختر الباقة العلاجية المتكاملة لتوفير التكلفة والالتزام بخطة واضحة، أو احصل على الأدلة الرقمية وحقائب التمارين المعرفية السلوكية (CBT & DBT).
          </p>
        </div>
      </section>

      <ProductsCatalogSection
        currency={currency}
        isPreview={false}
        onAddToBasket={onAddToBasket}
        onBookProductNow={(productId) => onNavigate('/booking', { itemId: productId })}
        onNavigate={onNavigate}
        basketIds={basketIds}
      />

      <PrivacySection />
      <BottomCtaBanner onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================================
 * 5. PRICING PAGE (/pricing)
 * ========================================================================== */
export const PricingPage: React.FC<{
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onNavigate: (route: RoutePath, params?: { itemId?: string }) => void;
}> = ({ currency, onCurrencyChange, onNavigate }) => {
  return (
    <div>
      {/* Page Hero */}
      <section className="py-14 lg:py-20 bg-gradient-to-b from-[#EAF4F4] to-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-extrabold text-[#145A5D]">
            الأسعار · باقات مرنة وواضحة
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            أسعار <span className="text-[#145A5D]">تمهيدية ومرنة</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto">
            ابدأ بجلسة مجانية لمدة 30 دقيقة واختر الجلسة أو الباقة التي تناسب احتياجاتك.
          </p>
        </div>
      </section>

      {/* Core Session Plans */}
      <PricingCardsSection
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        onBookPlan={(planId) => onNavigate('/booking', { itemId: planId })}
      />

      {/* Payment Information Card (Matching pricing_c78348d9.png) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-6 sm:p-9 shadow-xs">
            <div className="flex items-center gap-3.5 pb-6 border-b border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-[#145A5D] text-white flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#0F172A]">معلومات الدفع</h2>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  طرق دفع آمنة ومرنة تناسب جميع الدول
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6">
              <div>
                <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-[#145A5D]" />
                  <span>العملات المقبولة</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-800 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#145A5D]" />
                    <span>الدولار الأمريكي (USD)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#145A5D]" />
                    <span>الجنيه الإسترليني (GBP)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#145A5D]" />
                    <span>اليورو (EUR)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#145A5D]" />
                    <span>أو ما يعادلها بعملتك المحلية (مثل الريال والدرهم)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2 mb-4">
                  <CreditCard className="w-4 h-4 text-[#145A5D]" />
                  <span>طرق الدفع</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-800 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#145A5D]" />
                    <span>بطاقات الائتمان والخصم (Visa / Mastercard)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#145A5D]" />
                    <span>التحويل البنكي المباشر</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#145A5D]" />
                    <span>PayPal</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-center">
              <button
                type="button"
                onClick={() => onNavigate('/booking', { itemId: 'session-free-intro' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#B8862D] hover:bg-[#9E7122] text-white font-extrabold text-sm sm:text-base transition-colors cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>احجز جلستك المجانية الآن</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <PrivacySection />
    </div>
  );
};

/* ============================================================================
 * 6. FAQ PAGE (/faq)
 * ========================================================================== */
export const FaqPage: React.FC<{
  onNavigate: (route: RoutePath) => void;
}> = ({ onNavigate }) => {
  return (
    <div>
      {/* Page Hero */}
      <section className="py-14 lg:py-20 bg-gradient-to-b from-[#EAF4F4] to-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-extrabold text-[#145A5D]">
            الأسئلة الشائعة · معلومات شاملة
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            إجابات على <span className="text-[#145A5D]">أسئلتك</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto">
            كل ما تحتاج معرفته عن الجلسات العلاجية، السرية، الباقات، وطرق الحجز.
          </p>
        </div>
      </section>

      {/* Full FAQ Accordion */}
      <FaqAccordionSection />

      {/* Emergency Notice Section (Matching faq_c5acbebf.png) */}
      <section className="py-14 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-extrabold text-rose-950">في حالات الطوارئ</h2>
                <p className="text-sm sm:text-base text-rose-900 font-medium leading-relaxed">
                  عند وجود خطر فوري على النفس أو الآخرين، تواصل فورًا مع خدمات الطوارئ في بلدك أو توجه إلى أقرب مستشفى. الجلسات العلاجية الأونلاين ليست بديلًا عن خدمات الطوارئ الطبية.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm font-extrabold text-rose-950">
                  <span className="bg-white border border-rose-300 px-3.5 py-1.5 rounded-lg tabular-nums">
                    UK بريطانيا: 999 أو 111
                  </span>
                  <span className="bg-white border border-rose-300 px-3.5 py-1.5 rounded-lg tabular-nums">
                    USA أمريكا: 911 أو 988
                  </span>
                  <span className="bg-white border border-rose-300 px-3.5 py-1.5 rounded-lg tabular-nums">
                    SA السعودية: 920033360
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Have Another Question? */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">لديك سؤال آخر؟</h2>
          <p className="text-sm sm:text-base text-slate-700 font-medium">
            تواصل معنا مباشرة وسنرد عليك في أقرب وقت ممكن.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`mailto:${DOCTOR_INFO.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white font-extrabold text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>راسلنا عبر البريد</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#145A5D] border-2 border-[#145A5D] font-extrabold text-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل عبر واتساب / نموذج الاتصال</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ============================================================================
 * 7. BOOKING PAGE (/booking)
 * ========================================================================== */
export const BookingPage: React.FC<{
  currency: CurrencyCode;
  initialItemId: string;
  onSaveBooking: (booking: ConfirmedBookingRecord) => void;
  savedBookings: ConfirmedBookingRecord[];
}> = ({ currency, initialItemId, onSaveBooking, savedBookings }) => {
  const [formState, setFormState] = useState<BookingFormInput>({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    problemDescription: '',
    selectedDate: '2026-10-25',
    selectedTime: '18:00',
    sessionFormat: 'zoom',
    paymentMethod: 'paypal',
    selectedItemId: initialItemId || 'session-free-intro',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [latestConfirmed, setLatestConfirmed] = useState<ConfirmedBookingRecord | null>(null);

  // Sync selectedItemId if initialItemId changes externally
  React.useEffect(() => {
    if (initialItemId) {
      setFormState((prev) => ({
        ...prev,
        selectedItemId: initialItemId,
      }));
    }
  }, [initialItemId]);

  const currentItem = resolveBookableItem(formState.selectedItemId);
  const isFreeSession = currentItem.priceUSD === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const record: ConfirmedBookingRecord = {
      ...formState,
      referenceCode: `MN-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleDateString('ar-EG'),
      itemTitle: currentItem.title,
      priceFormatted: formatPrice(currentItem.priceUSD, currency),
    };
    setLatestConfirmed(record);
    onSaveBooking(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 lg:py-16 bg-[#F4F8F8] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-extrabold text-[#145A5D] mb-1">
            احجز جلستك الآن · تأكيد فوري ومباشر
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">إتمام الحجز</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-700 font-medium">
            أكمل بياناتك وسنتواصل معك لتأكيد الموعد وتفاصيل الجلسة أو الباقة المختارة.
          </p>
        </div>

        {/* Confirmation Banner if submitted */}
        {latestConfirmed && (
          <div
            role="status"
            aria-live="polite"
            className="mb-8 bg-emerald-50 border-2 border-emerald-600 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 border-b border-emerald-200">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-extrabold text-emerald-950">
                    تم استلام وتأكيد طلب الحجز بنجاح!
                  </h2>
                  <p className="text-sm text-emerald-900 font-medium mt-1">
                    رقم مرجع الحجز:{' '}
                    <span className="font-mono font-extrabold">{latestConfirmed.referenceCode}</span>
                  </p>
                </div>
              </div>
              <span className="text-sm font-extrabold bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg tabular-nums">
                {latestConfirmed.priceFormatted}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-xs sm:text-sm text-emerald-950">
              <div>
                <span className="font-bold text-emerald-800 block">الاسم الكامل:</span>
                <span className="font-extrabold">{latestConfirmed.fullName}</span>
              </div>
              <div>
                <span className="font-bold text-emerald-800 block">الجلسة / الباقة:</span>
                <span className="font-extrabold">{latestConfirmed.itemTitle}</span>
              </div>
              <div>
                <span className="font-bold text-emerald-800 block">الموعد المختار:</span>
                <span className="font-extrabold tabular-nums">
                  {latestConfirmed.selectedDate} — الساعة {latestConfirmed.selectedTime}
                </span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${DOCTOR_INFO.phoneRaw}?text=${encodeURIComponent(
                  `مرحباً د. معن، قمت بإتمام حجز (${latestConfirmed.itemTitle}) برقم مرجع ${latestConfirmed.referenceCode} باسم ${latestConfirmed.fullName} ليوم ${latestConfirmed.selectedDate} الساعة ${latestConfirmed.selectedTime}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال تفاصيل الحجز عبر واتساب للتأكيد السريع</span>
              </a>
              <button
                type="button"
                onClick={() => setLatestConfirmed(null)}
                className="px-4 py-2.5 rounded-xl bg-white border border-emerald-600 text-emerald-900 text-xs sm:text-sm font-bold cursor-pointer"
              >
                إجراء حجز جديد
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Card 0: Choose Session Plan or Therapeutic Product */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-[#145A5D]" />
              <span>نوع الجلسة أو الباقة العلاجية المختارة</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {SESSION_PLANS.map((plan) => {
                const selected = formState.selectedItemId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() =>
                      setFormState((prev) => ({
                        ...prev,
                        selectedItemId: plan.id,
                        paymentMethod: plan.priceUSD === 0 ? 'free' : 'paypal',
                      }))
                    }
                    className={`p-4 rounded-xl border text-right transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#EAF4F4] border-2 border-[#145A5D]'
                        : 'bg-[#F8FAFC] border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-extrabold text-[#0F172A]">{plan.title}</span>
                      <span className="text-sm font-extrabold text-[#145A5D] tabular-nums">
                        {formatPrice(plan.priceUSD, currency)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-medium">
                      {plan.durationMinutes} دقيقة
                    </p>
                  </button>
                );
              })}
            </div>

            <div>
              <label
                htmlFor="booking-item-select"
                className="block text-xs font-extrabold text-slate-700 mb-2"
              >
                أو اختر من الباقات المتكاملة والأدلة العلاجية:
              </label>
              <select
                id="booking-item-select"
                value={formState.selectedItemId}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    selectedItemId: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-300 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#145A5D]"
              >
                <optgroup label="الجلسات الفردية">
                  {SESSION_PLANS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.durationMinutes} دقيقة) — {formatPrice(s.priceUSD, currency)}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="الباقات المتكاملة والأدلة الرقمية">
                  {THERAPEUTIC_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {formatPrice(p.priceUSD, currency)}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Card 1: Personal Details (البيانات الشخصية) */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2 mb-5">
              <User className="w-5 h-5 text-[#145A5D]" />
              <span>البيانات الشخصية</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="booking-fullname"
                  className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                >
                  الاسم الكامل
                </label>
                <input
                  id="booking-fullname"
                  type="text"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-[#145A5D]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs font-bold text-rose-700">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-age"
                    className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                  >
                    العمر
                  </label>
                  <input
                    id="booking-age"
                    type="number"
                    min={10}
                    max={100}
                    value={formState.age}
                    onChange={(e) => setFormState((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder="مثال: 30"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-[#145A5D]"
                  />
                  {errors.age && (
                    <p className="mt-1 text-xs font-bold text-rose-700">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                  >
                    رقم الموبايل (مع رمز الدولة أو واتساب)
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    dir="ltr"
                    value={formState.phone}
                    onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+966 5XX XXX XXXX / 01XXXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium text-right focus:outline-none focus:border-[#145A5D]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs font-bold text-rose-700">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Problem Description (وصف المشكلة) */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-[#145A5D]" />
              <span>وصف المشكلة وصيغة الجلسة</span>
            </h2>

            <div className="space-y-4">
              <div>
                <span className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-2">
                  صيغة الجلسة المفضلة:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'zoom' as const, label: 'فيديو (Zoom)' },
                    { id: 'chat' as const, label: 'محادثة كتابية' },
                    { id: 'call' as const, label: 'اتصال صوتي' },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() =>
                        setFormState((prev) => ({ ...prev, sessionFormat: fmt.id }))
                      }
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                        formState.sessionFormat === fmt.id
                          ? 'bg-[#145A5D] text-white border-[#145A5D]'
                          : 'bg-[#F8FAFC] text-slate-800 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-problem"
                  className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                >
                  اشرح مشكلتك باختصار
                </label>
                <textarea
                  id="booking-problem"
                  rows={4}
                  value={formState.problemDescription}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, problemDescription: e.target.value }))
                  }
                  placeholder="اكتب وصفًا مختصرًا لما تمر به وما تريد المساعدة فيه..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-[#145A5D]"
                />
                {errors.problemDescription && (
                  <p className="mt-1 text-xs font-bold text-rose-700">
                    {errors.problemDescription}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Session Date & Time (موعد الجلسة) */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2 mb-5">
              <Calendar className="w-5 h-5 text-[#145A5D]" />
              <span>موعد الجلسة</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                >
                  اختر اليوم / التاريخ
                </label>
                <input
                  id="booking-date"
                  type="date"
                  value={formState.selectedDate}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, selectedDate: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#145A5D]"
                />
                {errors.selectedDate && (
                  <p className="mt-1 text-xs font-bold text-rose-700">{errors.selectedDate}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="booking-time"
                  className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                >
                  اختر الساعة (بتوقيت مكة / لندن)
                </label>
                <select
                  id="booking-time"
                  value={formState.selectedTime}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, selectedTime: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-300 text-slate-900 text-sm font-bold focus:outline-none focus:border-[#145A5D]"
                >
                  <option value="11:00">11:00 صباحًا</option>
                  <option value="13:00">01:00 ظهرًا</option>
                  <option value="16:00">04:00 عصرًا</option>
                  <option value="18:00">06:00 مساءً</option>
                  <option value="20:00">08:00 مساءً</option>
                  <option value="21:30">09:30 مساءً</option>
                </select>
                {errors.selectedTime && (
                  <p className="mt-1 text-xs font-bold text-rose-700">{errors.selectedTime}</p>
                )}
              </div>
            </div>
          </div>

          {/* Card 4: Payment Method (طريقة الدفع) */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2 mb-5">
              <CreditCard className="w-5 h-5 text-[#145A5D]" />
              <span>طريقة الدفع</span>
            </h2>

            {isFreeSession ? (
              <div className="bg-[#EAF4F4] border border-[#145A5D] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-extrabold text-[#0F172A]">
                    الجلسة التمهيدية مجانية بالكامل (30 دقيقة)
                  </p>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    لا يتطلب هذا الحجز أي رسوم أو بيانات بطاقة بنكية.
                  </p>
                </div>
                <span className="text-sm font-extrabold text-[#145A5D]">مجانًا</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  {
                    id: 'paypal' as const,
                    title: 'PayPal',
                    sub: 'ادفع بأمان عبر حساب PayPal الخاص بك',
                  },
                  {
                    id: 'card' as const,
                    title: 'بطاقة ائتمان / خصم',
                    sub: 'Visa / Mastercard / Apple Pay',
                  },
                  {
                    id: 'bank' as const,
                    title: 'تحويل بنكي مباشر',
                    sub: 'تزويدك ببيانات الحساب البنكي البريطاني أو الدولي',
                  },
                ].map((pm) => {
                  const active = formState.paymentMethod === pm.id;
                  return (
                    <label
                      key={pm.id}
                      className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                        active
                          ? 'bg-[#EAF4F4] border-2 border-[#145A5D]'
                          : 'bg-[#F8FAFC] border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={active}
                        onChange={() =>
                          setFormState((prev) => ({ ...prev, paymentMethod: pm.id }))
                        }
                        className="mt-1 accent-[#145A5D]"
                      />
                      <div>
                        <span className="text-sm font-extrabold text-[#0F172A] block">
                          {pm.title}
                        </span>
                        <span className="text-xs text-slate-700 font-medium">{pm.sub}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-[#145A5D] hover:bg-[#0E3F41] text-white font-extrabold text-base shadow-sm flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            <span>
              تأكيد الحجز ({currentItem.title} — {formatPrice(currentItem.priceUSD, currency)})
            </span>
          </button>
        </form>

        {/* Saved Bookings History in Session */}
        {savedBookings.length > 0 && (
          <div className="mt-10 bg-white border border-slate-300 rounded-2xl p-6">
            <h3 className="text-base font-extrabold text-[#0F172A] mb-4">
              حجوزاتك المسجلة في هذه الجلسة ({savedBookings.length})
            </h3>
            <div className="space-y-2.5">
              {savedBookings.map((b) => (
                <div
                  key={b.referenceCode}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm"
                >
                  <div>
                    <span className="font-mono font-bold text-[#145A5D] ml-2">
                      #{b.referenceCode}
                    </span>
                    <span className="font-extrabold text-[#0F172A]">{b.itemTitle}</span>
                    <span className="text-slate-600 mr-2">({b.fullName})</span>
                  </div>
                  <div className="font-bold text-slate-800 tabular-nums">
                    {b.selectedDate} · {b.selectedTime} · {b.priceFormatted}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
 * 8. CONTACT PAGE (/contact)
 * ========================================================================== */
export const ContactPage: React.FC<{
  onNavigate: (route: RoutePath, params?: { itemId?: string }) => void;
}> = ({ onNavigate }) => {
  const [contactForm, setContactForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateContactForm(contactForm);
    if (!res.valid) {
      setContactErrors(res.errors);
      return;
    }
    setContactErrors({});
    setSubmittedMessage(true);
  };

  return (
    <div>
      {/* Page Hero */}
      <section className="py-14 lg:py-20 bg-gradient-to-b from-[#EAF4F4] to-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-extrabold text-[#926214]">
            تواصل معنا · استجابة سريعة ومباشرة
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            نحن هنا <span className="text-[#145A5D]">لمساعدتك</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto">
            لا تتردد في التواصل معنا لأي استفسار أو لحجز جلستك الأولى المجانية. نسعد بالرد عليك في أقرب وقت.
          </p>
        </div>
      </section>

      {/* 4 Contact Info Cards (Matching contact_aec59d00.png) */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            <a
              href={`https://wa.me/${DOCTOR_INFO.phoneRaw}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#F8FAFC] border border-slate-300 hover:border-[#145A5D] rounded-2xl p-6 text-right transition-colors block"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-extrabold text-[#0F172A]">واتساب</h2>
              <p dir="ltr" className="text-sm font-extrabold text-[#145A5D] mt-1 text-right tabular-nums">
                {DOCTOR_INFO.phoneDisplay}
              </p>
              <p className="text-xs text-slate-700 font-medium mt-1">تواصل فوري ومباشر</p>
            </a>

            <a
              href={`mailto:${DOCTOR_INFO.email}`}
              className="bg-[#F8FAFC] border border-slate-300 hover:border-[#145A5D] rounded-2xl p-6 text-right transition-colors block"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-base font-extrabold text-[#0F172A]">البريد الإلكتروني</h2>
              <p className="text-sm font-extrabold text-[#145A5D] mt-1 font-mono">
                {DOCTOR_INFO.email}
              </p>
              <p className="text-xs text-slate-700 font-medium mt-1">للاستفسارات والمراسلات</p>
            </a>

            <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-6 text-right">
              <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] text-[#926214] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-base font-extrabold text-[#0F172A]">الموقع</h2>
              <p className="text-sm font-extrabold text-[#145A5D] mt-1">{DOCTOR_INFO.location}</p>
              <p className="text-xs text-slate-700 font-medium mt-1">{DOCTOR_INFO.locationSub}</p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-6 text-right">
              <div className="w-11 h-11 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-base font-extrabold text-[#0F172A]">أوقات العمل</h2>
              <p className="text-sm font-extrabold text-[#145A5D] mt-1">
                {DOCTOR_INFO.workingHours}
              </p>
              <p className="text-xs text-slate-700 font-medium mt-1">
                {DOCTOR_INFO.workingHoursSub}
              </p>
            </div>
          </div>

          {/* Split Form & Socials Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Right in RTL: Send us a message form */}
            <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-300 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">أرسل لنا رسالة</h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium mb-6">
                املأ النموذج وسنتواصل معك عبر الواتساب أو البريد الإلكتروني في أقرب وقت ممكن.
              </p>

              {submittedMessage && (
                <div
                  role="status"
                  className="mb-6 bg-emerald-50 border border-emerald-600 rounded-xl p-4 text-emerald-950"
                >
                  <p className="text-sm font-extrabold">
                    تم إرسال رسالتك بنجاح شكرًا لتواصلك يا {contactForm.fullName}!
                  </p>
                  <p className="text-xs font-medium mt-1">
                    سيتواصل معك مكتب د. معن الخفاف في أقرب وقت، أو يمكنك متابعة المحادثة مباشرة عبر واتساب.
                  </p>
                </div>
              )}

              <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                    >
                      الاسم الكامل
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactForm.fullName}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      placeholder="أدخل اسمك"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-[#145A5D]"
                    />
                    {contactErrors.fullName && (
                      <p className="mt-1 text-xs font-bold text-rose-700">
                        {contactErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                    >
                      رقم الهاتف
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      dir="ltr"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="+966 5XX XXX XXXX"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium text-right focus:outline-none focus:border-[#145A5D]"
                    />
                    {contactErrors.phone && (
                      <p className="mt-1 text-xs font-bold text-rose-700">{contactErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    dir="ltr"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium text-right focus:outline-none focus:border-[#145A5D]"
                  />
                  {contactErrors.email && (
                    <p className="mt-1 text-xs font-bold text-rose-700">{contactErrors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5"
                  >
                    رسالتك
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="اكتب رسالتك أو استفسارك هنا..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-[#145A5D]"
                  />
                  {contactErrors.message && (
                    <p className="mt-1 text-xs font-bold text-rose-700">
                      {contactErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#B8862D] hover:bg-[#9E7122] text-white font-extrabold text-sm sm:text-base transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال عبر واتساب / حفظ الرسالة</span>
                </button>
              </form>
            </div>

            {/* Left in RTL: Social Media & Free 1st Session Promo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-6">
                <h3 className="text-lg font-extrabold text-[#0F172A] mb-4">
                  تابعنا على السوشيال ميديا
                </h3>
                <div className="space-y-3">
                  <a
                    href={DOCTOR_INFO.socials.tiktok.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white border border-slate-300 hover:border-[#145A5D] rounded-xl p-4 flex items-center justify-between transition-colors"
                  >
                    <span className="text-slate-600 font-bold">←</span>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#0F172A] block">
                          {DOCTOR_INFO.socials.tiktok.label}
                        </span>
                        <span dir="ltr" className="text-xs text-slate-600 font-mono">
                          {DOCTOR_INFO.socials.tiktok.handle}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-xs">
                        TT
                      </div>
                    </div>
                  </a>

                  <a
                    href={DOCTOR_INFO.socials.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white border border-slate-300 hover:border-[#145A5D] rounded-xl p-4 flex items-center justify-between transition-colors"
                  >
                    <span className="text-slate-600 font-bold">←</span>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#0F172A] block">
                          {DOCTOR_INFO.socials.instagram.label}
                        </span>
                        <span dir="ltr" className="text-xs text-slate-600 font-mono">
                          {DOCTOR_INFO.socials.instagram.handle}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-pink-700 text-white flex items-center justify-center font-extrabold text-xs">
                        IG
                      </div>
                    </div>
                  </a>

                  <a
                    href={DOCTOR_INFO.socials.facebook.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white border border-slate-300 hover:border-[#145A5D] rounded-xl p-4 flex items-center justify-between transition-colors"
                  >
                    <span className="text-slate-600 font-bold">←</span>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#0F172A] block">
                          {DOCTOR_INFO.socials.facebook.label}
                        </span>
                        <span className="text-xs text-slate-600 font-semibold">
                          {DOCTOR_INFO.socials.facebook.handle}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-extrabold text-xs">
                        FB
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Free 1st Session Promo Card */}
              <div className="bg-[#FEF3C7]/70 border-2 border-[#D99B26] rounded-2xl p-6 text-right space-y-3">
                <div className="flex items-center gap-2 text-[#926214] font-extrabold text-base">
                  <Gift className="w-5 h-5" />
                  <span>الجلسة الأولى مجانية</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  احصل على 30 دقيقة مجانية لفهم حالتك وتحديد الاتجاه العلاجي المناسب دون أي التزام.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('/booking', { itemId: 'session-free-intro' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B8862D] hover:bg-[#9E7122] text-white font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>احجز جلستك المجانية</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
