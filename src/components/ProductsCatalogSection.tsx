import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Check,
  Eye,
  FileText,
  Layers,
  PlayCircle,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import {
  CurrencyCode,
  ProductCategory,
  RoutePath,
  THERAPEUTIC_PRODUCTS,
  TherapeuticProduct,
} from '../data/siteData';
import { filterTherapeuticProducts, formatPrice } from '../utils/bookingLogic';

interface ProductsCatalogProps {
  currency: CurrencyCode;
  isPreview?: boolean;
  onAddToBasket: (productId: string) => void;
  onBookProductNow: (productId: string) => void;
  onNavigate?: (route: RoutePath) => void;
  basketIds: string[];
}

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'جميع المنتجات والباقات (9)' },
  { id: 'bundles', label: 'باقات الجلسات المتكاملة (4)' },
  { id: 'workbooks', label: 'الأدلة والتمارين الرقمية (3)' },
  { id: 'courses', label: 'الدورات المسجلة (1)' },
  { id: 'assessments', label: 'التقييمات الشاملة (1)' },
];

export const ProductsCatalogSection: React.FC<ProductsCatalogProps> = ({
  currency,
  isPreview = false,
  onAddToBasket,
  onBookProductNow,
  onNavigate,
  basketIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductModal, setActiveProductModal] = useState<TherapeuticProduct | null>(null);

  const filtered = filterTherapeuticProducts(
    THERAPEUTIC_PRODUCTS,
    selectedCategory,
    searchQuery
  );
  const displayedProducts = isPreview ? filtered.slice(0, 3) : filtered;

  const renderCategoryIcon = (cat: TherapeuticProduct['category']) => {
    switch (cat) {
      case 'bundles':
        return <Layers className="w-5 h-5 text-[#145A5D]" />;
      case 'workbooks':
        return <BookOpen className="w-5 h-5 text-[#926214]" />;
      case 'courses':
        return <PlayCircle className="w-5 h-5 text-emerald-700" />;
      case 'assessments':
        return <FileText className="w-5 h-5 text-[#145A5D]" />;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isPreview && (
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-extrabold text-[#145A5D] mb-2">
                المنتجات والباقات العلاجية · حلول متكاملة ومصممة علميًا
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                باقات الجلسات <span className="text-[#145A5D]">والأدلة العلاجية التطبيقية</span>
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-700 max-w-2xl font-medium">
                إلى جانب الجلسات الفردية، وفرنا لك باقات علاجية مخفضة، وأدلة تمارين معرفية وسلوكية (CBT & DBT)، ودورات مسجلة لدعم تعافيك خطوة بخطوة.
              </p>
            </div>

            {onNavigate && (
              <a
                href="/products"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/products');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <span>تصفح جميع المنتجات والباقات (9)</span>
              </a>
            )}
          </div>
        )}

        {/* Filter & Search Bar (Full view or interactive filter) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-300">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#145A5D] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {!isPreview && (
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن باقة، القلق، الزوجي، CBT..."
                aria-label="ابحث في المنتجات والباقات"
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:border-[#145A5D]"
              />
            </div>
          )}
        </div>

        {/* Products Grid */}
        {displayedProducts.length === 0 ? (
          <div className="bg-white border border-slate-300 rounded-2xl p-10 text-center">
            <p className="text-base font-extrabold text-slate-800">
              لا توجد منتجات مطابقة لبحثك الحالي.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#145A5D] text-white text-sm font-bold cursor-pointer"
            >
              إعادة عرض جميع المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {displayedProducts.map((product) => {
              const inBasket = basketIds.includes(product.id);
              const savingsUSD =
                product.originalPriceUSD && product.originalPriceUSD > product.priceUSD
                  ? product.originalPriceUSD - product.priceUSD
                  : 0;

              return (
                <article
                  key={product.id}
                  className="bg-white border border-slate-300 rounded-2xl p-6 flex flex-col justify-between hover:border-[#145A5D] transition-all shadow-xs"
                >
                  <div>
                    {/* Top Visual Header */}
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#EAF4F4] border border-[#B8D8D8] flex items-center justify-center shrink-0">
                          {renderCategoryIcon(product.category)}
                        </div>
                        <div className="text-xs font-bold text-slate-700">
                          <span>{product.categoryLabel}</span>
                          <span aria-hidden="true" className="mx-1.5">
                            ·
                          </span>
                          <span className="text-[#145A5D]">{product.durationOrFormat}</span>
                        </div>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg font-extrabold text-[#0F172A] leading-snug mb-2">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-4">
                      {product.subtitle}
                    </p>

                    {/* Price Block */}
                    <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3.5 mb-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-600 block">السعر الحالي</span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-2xl font-extrabold text-[#0F172A] tabular-nums">
                            {formatPrice(product.priceUSD, currency)}
                          </span>
                          {product.originalPriceUSD && (
                            <span className="text-xs font-bold text-slate-500 line-through tabular-nums">
                              {formatPrice(product.originalPriceUSD, currency)}
                            </span>
                          )}
                        </div>
                      </div>
                      {savingsUSD > 0 && (
                        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg tabular-nums">
                          وفر {formatPrice(savingsUSD, currency)}
                        </span>
                      )}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                      {product.highlights.slice(0, 3).map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium"
                        >
                          <Check className="w-4 h-4 text-[#145A5D] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-slate-200 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onBookProductNow(product.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white text-xs sm:text-sm font-extrabold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>احجز / اطلب الآن</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onAddToBasket(product.id)}
                        className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl border text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          inBasket
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{inBasket ? 'في السلة' : 'أضف للسلة'}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveProductModal(product)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-[#145A5D] hover:bg-[#EAF4F4] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>عرض محتويات الباقة / الدليل بالتفصيل</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeProductModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl relative my-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-extrabold text-[#145A5D] mb-1">
                  {activeProductModal.categoryLabel} · {activeProductModal.durationOrFormat}
                </p>
                <h3
                  id="modal-product-title"
                  className="text-xl sm:text-2xl font-extrabold text-[#0F172A]"
                >
                  {activeProductModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProductModal(null)}
                aria-label="إغلاق التفاصيل"
                className="p-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-5 text-right">
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                {activeProductModal.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F8FAFC] border border-slate-300 rounded-xl p-4 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-slate-600 block">الفئة المستهدفة:</span>
                  <span className="font-extrabold text-[#0F172A]">
                    {activeProductModal.targetAudience}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-600 block">طريقة الاستلام / التقديم:</span>
                  <span className="font-extrabold text-[#145A5D]">
                    {activeProductModal.deliveryMethod}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-[#0F172A] mb-2.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#926214]" />
                  <span>ماذا يشمل هذا البرنامج / المنتج بالتفصيل؟</span>
                </h4>
                <ul className="space-y-2 bg-[#F4F8F8] border border-[#C5DFDF] rounded-xl p-4">
                  {activeProductModal.syllabusOrIncludes.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-900 font-semibold"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#145A5D] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-[#0F172A] mb-2">أبرز المميزات:</h4>
                <ul className="space-y-2">
                  {activeProductModal.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                      <Check className="w-4 h-4 text-[#145A5D] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-600 block">السعر الإجمالي</span>
                <span className="text-2xl font-extrabold text-[#0F172A] tabular-nums">
                  {formatPrice(activeProductModal.priceUSD, currency)}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    onAddToBasket(activeProductModal.id);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-extrabold cursor-pointer whitespace-nowrap"
                >
                  أضف إلى السلة
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = activeProductModal.id;
                    setActiveProductModal(null);
                    onBookProductNow(id);
                  }}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white text-xs sm:text-sm font-extrabold cursor-pointer whitespace-nowrap"
                >
                  المتابعة للحجز والطلب
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
