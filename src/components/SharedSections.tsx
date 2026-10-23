import React, { useState } from 'react';
import {
  Award,
  Brain,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Eye,
  FileCheck,
  Gift,
  Globe,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Link2,
  Lock,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Video,
} from 'lucide-react';
import {
  CHALLENGES_DATA,
  CURRENCIES,
  CurrencyCode,
  DOCTOR_INFO,
  FAQ_ITEMS,
  JOURNEY_STEPS,
  RoutePath,
  SESSION_PLANS,
  THERAPEUTIC_METHODS,
  WHY_ME_PILLARS,
} from '../data/siteData';
import { formatPrice } from '../utils/bookingLogic';

export const ROUTE_META: Record<
  RoutePath,
  { title: string; slugDisplay: string; breadcrumb: string }
> = {
  '/': {
    title: 'الصفحة الرئيسية',
    slugDisplay: 'az-dr-maan-clinic.pages.dev/',
    breadcrumb: 'الرئيسية',
  },
  '/why-me': {
    title: 'لماذا أنا؟ — الخبرة والمؤهلات',
    slugDisplay: 'az-dr-maan-clinic.pages.dev/why-me',
    breadcrumb: 'لماذا أنا؟',
  },
  '/services': {
    title: 'الخدمات والجلسات العلاجية',
    slugDisplay: 'az-dr-maan-clinic.pages.dev/services',
    breadcrumb: 'الخدمات',
  },
  '/products': {
    title: 'المنتجات والباقات والأدلة العلاجية',
    slugDisplay: 'az-dr-maan-clinic.pages.dev/products',
    breadcrumb: 'المنتجات والباقات',
  },
  '/pricing': {
    title: 'الأسعار وخيارات الدفع',
    slugDisplay: 'az-dr-maan-clinic.pages.dev/pricing',
    breadcrumb: 'الأسعار',
  },
  '/faq': {
    title: 'الأسئلة الشائعة ومعلومات الطوارئ',
    slugDisplay: 'az-dr-maan-clinic.pages.dev/faq',
    breadcrumb: 'الأسئلة الشائعة',
  },
  '/booking': {
    title: 'إتمام الحجز وتأكيد الموعد',
    slugDisplay: 'az-dr-maan-clinic.pages.dev/booking',
    breadcrumb: 'إتمام الحجز',
  },
  '/contact': {
    title: 'اتصل بنا وقنوات التواصل',
    slugDisplay: 'az-dr-maan-clinic.pages.dev/contact',
    breadcrumb: 'اتصل بنا',
  },
};

export const PageUrlBanner: React.FC<any> = () => null;

export const WhyMeSection: React.FC<{
  onNavigate?: (route: RoutePath) => void;
  showMoreLink?: boolean;
}> = ({ onNavigate, showMoreLink }) => {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'award':
        return <Award className="w-6 h-6 text-white" />;
      case 'graduation':
        return <GraduationCap className="w-6 h-6 text-white" />;
      case 'brain':
        return <Brain className="w-6 h-6 text-white" />;
      default:
        return <Globe className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-extrabold text-[#145A5D] mb-2">
            لماذا تختارنا؟ · معايير مهنية بريطانية
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            خبرة مهنية <span className="text-[#145A5D]">تصنع الفارق</span>
          </h2>
          <p className="mt-3 text-base text-slate-700 font-medium">
            نجمع بين الخبرة الإكلينيكية الطويلة في بريطانيا والمنهجيات العلمية الحديثة في بيئة آمنة ومريحة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_ME_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-[#F8FAFC] border border-slate-300 rounded-2xl p-6 text-right hover:border-[#145A5D] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#145A5D] flex items-center justify-center shadow-xs shrink-0">
                    {renderIcon(pillar.icon)}
                  </div>
                  <span className="text-xs font-bold text-[#145A5D] tabular-nums">
                    {pillar.metric}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0F172A] mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showMoreLink && onNavigate && (
          <div className="mt-10 text-center">
            <a
              href="/why-me"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/why-me');
              }}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#145A5D] hover:text-[#0E3F41] underline underline-offset-4"
            >
              <span>تعرّف أكثر على المؤهلات والفلسفة العلاجية</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export const ChallengesSection: React.FC<{
  onBookItem: (itemId: string) => void;
}> = ({ onBookItem }) => {
  const [selectedAudience, setSelectedAudience] = useState<'adults' | 'teens' | 'couples'>('adults');
  const [activeChallengeId, setActiveChallengeId] = useState<string>(CHALLENGES_DATA[0].id);

  const activeChallenge =
    CHALLENGES_DATA.find((c) => c.id === activeChallengeId) || CHALLENGES_DATA[0];

  const audienceDetails = {
    adults: {
      title: 'جلسات فردية للبالغين',
      desc: 'مساحة علاجية سرية للتعامل مع القلق، الاكتئاب، الوسواس القهري، الصدمات، وضغوط الحياة والعمل.',
    },
    teens: {
      title: 'جلسات مخصصة للمراهقين (12 - 18 عامًا)',
      desc: 'دعم نفسي متخصص للمراهقين لبناء الثقة بالنفس، تنظيم الانفعالات، والتغلب على القلق الدراسي والاجتماعي وفق الضوابط البريطانية.',
    },
    couples: {
      title: 'جلسات الإرشاد الزوجي والعلاقات',
      desc: 'جلسات مشتركة للأزواج لتحسين مهارات الحوار، حل النزاعات المتكررة، وإعادة بناء الثقة والأمان العاطفي.',
    },
  };

  return (
    <section className="py-16 lg:py-20 bg-[#F4F8F8] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-extrabold text-[#926214] mb-2">
            لمن هذه الجلسات؟ · تخصصات دقيقة
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            نساعدك في التغلب على <span className="text-[#145A5D]">تحدياتك النفسية</span>
          </h2>
        </div>

        {/* Audience Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {[
            { id: 'adults' as const, label: 'بالغون', icon: Users },
            { id: 'teens' as const, label: 'مراهقون', icon: ShieldCheck },
            { id: 'couples' as const, label: 'أزواج', icon: HeartHandshake },
          ].map((aud) => {
            const Icon = aud.icon;
            const isSelected = selectedAudience === aud.id;
            return (
              <button
                key={aud.id}
                type="button"
                onClick={() => setSelectedAudience(aud.id)}
                className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-colors border cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#145A5D] text-white border-[#145A5D] shadow-xs'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-[#145A5D]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{aud.label}</span>
              </button>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto text-center mb-10 bg-white border border-slate-300 rounded-xl px-5 py-3.5">
          <p className="text-sm font-extrabold text-[#0F172A]">
            {audienceDetails[selectedAudience].title}
          </p>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
            {audienceDetails[selectedAudience].desc}
          </p>
        </div>

        {/* Interactive Challenges Selector */}
        <div className="text-center mb-5">
          <h3 className="text-base font-extrabold text-[#0F172A] mb-4">
            التحديات التي أعمل عليها (اضغط على التحدي لعرض الخطة العلاجية):
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {CHALLENGES_DATA.map((item) => {
              const active = item.id === activeChallenge.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveChallengeId(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors border cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Interactive Panel for Selected Challenge */}
        <div className="mt-8 bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold text-[#145A5D]">
                التشخيص والتدخل العلاجي · {activeChallenge.expectedSessions}
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                {activeChallenge.title}
              </h4>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                {activeChallenge.shortDesc}
              </p>
              <div>
                <h5 className="text-sm font-extrabold text-[#0F172A] mb-2">
                  أبرز الأعراض والمؤشرات التي نعاملها:
                </h5>
                <ul className="space-y-2">
                  {activeChallenge.symptoms.map((sym, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                      <Check className="w-4 h-4 text-[#145A5D] shrink-0 mt-1" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-300 rounded-xl p-5 space-y-4">
              <h5 className="text-sm font-extrabold text-[#145A5D]">
                كيف نعمل معًا في الجلسات؟
              </h5>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {activeChallenge.therapeuticApproach}
              </p>
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => onBookItem('session-free-intro')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>احجز جلسة تمهيدية مجانية</span>
                </button>
                <button
                  type="button"
                  onClick={() => onBookItem(activeChallenge.recommendedProductId)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] border border-slate-300 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>عرض الباقة أو الدليل الموصى به</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const JourneySection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-extrabold text-[#145A5D] mb-2">
            كيف تسير الجلسات؟ · خطوات منظمة
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            رحلة علاجية <span className="text-[#145A5D]">واضحة المعالم</span>
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-700 font-medium">
            نبدأ بجلسة مجانية لفهم حالتك، ثم نضع خطة علاجية تناسب احتياجاتك وتقيس تقدمك بدقة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNEY_STEPS.map((step) => {
            const isHighlighted = step.isHighlighted;
            return (
              <div
                key={step.stepNumber}
                className={`relative rounded-2xl p-6 border transition-colors ${
                  isHighlighted
                    ? 'bg-[#145A5D] text-white border-[#0F4547] shadow-sm'
                    : 'bg-[#F8FAFC] text-[#0F172A] border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold tabular-nums ${
                      isHighlighted
                        ? 'bg-[#D99B26] text-slate-950'
                        : 'bg-[#145A5D] text-white'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isHighlighted ? 'text-amber-300' : 'text-[#926214]'
                    }`}
                  >
                    {step.badge}
                  </span>
                </div>

                <h3
                  className={`text-lg font-extrabold mb-2 ${
                    isHighlighted ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed font-medium ${
                    isHighlighted ? 'text-slate-100' : 'text-slate-700'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 max-w-2xl mx-auto bg-[#F8FAFC] border border-slate-300 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="sm:border-l sm:border-slate-300 sm:pl-4">
            <p className="text-xs font-bold text-slate-600">مدة الجلسة</p>
            <p className="text-sm font-extrabold text-[#0F172A] mt-0.5 tabular-nums">
              30 دقيقة أو 60 دقيقة
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-600">النمط</p>
            <p className="text-sm font-extrabold text-[#0F172A] mt-0.5">
              أونلاين بالكامل عبر منصة آمنة ومشفرة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MethodologySection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-[#F4F8F8] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Right Column in RTL: Methodology explanation */}
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-extrabold text-[#926214]">
              المنهج العلاجي · ممارسة قائمة على الدليل العلمي
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] leading-tight">
              منهج علاجي متكامل{' '}
              <span className="text-[#145A5D]">يختار الأدوات الأنسب</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              نعمل وفق منهج علاجي متكامل يختار الأدوات الأنسب لكل حالة. التركيز ليس على تهدئة الأعراض مؤقتًا فقط، بل على بناء فهم عميق ومهارات قابلة للتطبيق تُحسّن الحياة اليومية وتقلل احتمالية الانتكاس.
            </p>

            <div className="space-y-2.5 pt-2">
              {THERAPEUTIC_METHODS.map((m) => (
                <div
                  key={m.code}
                  className="bg-white border border-slate-300 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-extrabold text-[#145A5D] bg-[#EAF4F4] px-2.5 py-1 rounded-md">
                      {m.code}
                    </span>
                    <span className="text-sm font-extrabold text-[#0F172A]">{m.name}</span>
                  </div>
                  <span className="text-xs text-slate-700 font-medium">{m.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Left Column in RTL: 4 Outcome Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-300 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A] mb-1">فهم عميق</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                ليس مجرد علاج سطحي للأعراض، بل فهم جذور المشكلة ومثيراتها النفسية.
              </p>
            </div>

            <div className="bg-white border border-slate-300 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A] mb-1">أهداف واضحة</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                خطة علاجية محددة المعالم يتم الاتفاق عليها ومراجعة نتائجها بانتظام.
              </p>
            </div>

            <div className="bg-white border border-slate-300 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] text-[#926214] flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A] mb-1">مهارات عملية</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                أدوات وتمارين معرفية وسلوكية قابلة للتطبيق اليومي خارج الجلسة.
              </p>
            </div>

            <div className="bg-white border border-slate-300 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A] mb-1">تقليل الانتكاس</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                نتائج مستدامة وبناء مرونة نفسية تحميك من عودة الأعراض مستقبلًا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PricingCardsSection: React.FC<{
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onBookPlan: (planId: string) => void;
}> = ({ currency, onCurrencyChange, onBookPlan }) => {
  const renderPlanIcon = (iconName: string, isFeatured?: boolean) => {
    const cls = `w-6 h-6 ${isFeatured ? 'text-white' : 'text-[#145A5D]'}`;
    if (iconName === 'gift') return <Gift className={cls} />;
    if (iconName === 'clock') return <Clock className={cls} />;
    return <Video className={cls} />;
  };

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-right">
            <p className="text-xs font-extrabold text-[#145A5D] mb-2">
              الأسعار التمهيدية · خيارات مرنة وشفافة
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              خيارات مرنة <span className="text-[#145A5D]">تناسب احتياجاتك</span>
            </h2>
            <p className="mt-2 text-sm text-slate-700 font-medium">
              جميع الأسعار بالدولار الأمريكي أو ما يعادلها بالعملات الأخرى.
            </p>
          </div>

          {/* Interactive Currency Switcher */}
          <div
            role="group"
            aria-label="اختيار العملة"
            className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-slate-100 border border-slate-300"
          >
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
              const active = currency === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onCurrencyChange(code)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#145A5D] text-white shadow-xs'
                      : 'text-slate-800 hover:bg-white'
                  }`}
                >
                  {code}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {SESSION_PLANS.map((plan) => {
            const isFeatured = Boolean(plan.isFeatured);
            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-7 border flex flex-col justify-between transition-all ${
                  isFeatured
                    ? 'bg-[#145A5D] text-white border-[#0F4547] shadow-md'
                    : 'bg-[#F8FAFC] text-[#0F172A] border-slate-300 hover:border-[#145A5D]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isFeatured
                          ? 'bg-white/15 border border-white/25'
                          : 'bg-[#EAF4F4] border border-[#B8D8D8]'
                      }`}
                    >
                      {renderPlanIcon(plan.iconName, isFeatured)}
                    </div>
                    {plan.badgeText && (
                      <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-[#D99B26] text-slate-950">
                        {plan.badgeText}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-xl font-extrabold ${
                      isFeatured ? 'text-white' : 'text-[#0F172A]'
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm mt-1 font-medium ${
                      isFeatured ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    {plan.subtitle}
                  </p>

                  <div className="my-6 pt-5 border-t border-current/15 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold tabular-nums">
                      {formatPrice(plan.priceUSD, currency)}
                    </span>
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        isFeatured ? 'text-slate-200' : 'text-slate-600'
                      }`}
                    >
                      / {plan.durationMinutes} دقيقة
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm font-medium">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-1 ${
                            isFeatured ? 'text-amber-300' : 'text-[#145A5D]'
                          }`}
                        />
                        <span className={isFeatured ? 'text-slate-100' : 'text-slate-800'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onBookPlan(plan.id)}
                  className={`w-full py-3.5 px-5 rounded-xl font-extrabold text-sm transition-colors cursor-pointer whitespace-nowrap ${
                    isFeatured
                      ? 'bg-[#D99B26] hover:bg-[#C4891D] text-slate-950'
                      : 'bg-[#145A5D] hover:bg-[#0E3F41] text-white'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const PrivacySection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F4F8F8] border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-extrabold text-[#926214] mb-1">
            السرية والخصوصية · التزام أخلاقي وقانوني
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            خصوصيتك أولويتنا <span className="text-[#145A5D]">القصوى</span>
          </h2>
        </div>

        <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start gap-4 pb-6 border-b border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-[#145A5D] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              كل ما يُناقش داخل الجلسة يخضع لسرية مهنية كاملة. تُستثنى السرية فقط في حالات محددة يفرضها الواجب المهني والقانون، مثل وجود خطر وشيك على النفس أو الآخرين، أو ما يتعلق بحماية القاصرين وفق الأنظمة البريطانية المعمول بها.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">تشفير كامل</h3>
                <p className="text-xs text-slate-700 font-medium">منصة آمنة ومشفرة</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#926214] flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">خصوصية تامة</h3>
                <p className="text-xs text-slate-700 font-medium">لا يطلع أحد على جلستك</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4F4] text-[#145A5D] flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A]">معايير مهنية</h3>
                <p className="text-xs text-slate-700 font-medium">وفق الأنظمة البريطانية</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FaqAccordionSection: React.FC<{
  limit?: number;
  onNavigate?: (route: RoutePath) => void;
}> = ({ limit, onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS;

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-extrabold text-[#145A5D] mb-1">أسئلة شائعة · إجابات واضحة</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            إجابات على <span className="text-[#145A5D]">أسئلتك</span>
          </h2>
        </div>

        <div className="space-y-3.5">
          {items.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'bg-[#F8FAFC] border-[#145A5D]'
                    : 'bg-white border-slate-300 hover:border-slate-400'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 text-right flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base font-extrabold text-[#0F172A]">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#145A5D] shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-800 leading-relaxed font-medium border-t border-slate-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {limit && onNavigate && (
          <div className="mt-8 text-center">
            <a
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/faq');
              }}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#145A5D] hover:underline"
            >
              <span>عرض جميع الأسئلة الشائعة وأرقام الطوارئ</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export const BottomCtaBanner: React.FC<{
  onNavigate: (route: RoutePath, params?: { itemId?: string }) => void;
}> = ({ onNavigate }) => {
  return (
    <section className="py-16 lg:py-20 bg-[#145A5D] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-xs font-extrabold text-amber-300">
          احجز موعدك الآن · أول 30 دقيقة مجانًا
        </p>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          ابدأ رحلتك نحو حياة أفضل
        </h2>
        <p className="text-base sm:text-lg text-slate-100 max-w-2xl mx-auto font-medium">
          أول 30 دقيقة مجانًا... لتفهم ما تمرّ به بدقة وتبدأ بخطة علاجية واضحة ومخصصة لك.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('/booking', { itemId: 'session-free-intro' })}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#D99B26] hover:bg-[#C4891D] text-slate-950 font-extrabold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-5 h-5" />
            <span>احجز جلستك المجانية</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5" />
            <span>تواصل معنا</span>
          </button>
        </div>

        <p className="text-xs text-slate-200 font-medium pt-2">
          بدون أي التزام · سرية تامة · جلسات أونلاين مرنة بالعربية والإنجليزية
        </p>
      </div>
    </section>
  );
};
