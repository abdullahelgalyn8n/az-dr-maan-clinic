import React from 'react';
import { Calendar, ShoppingBag, Trash2, X } from 'lucide-react';
import { CurrencyCode, RoutePath } from '../data/siteData';
import {
  calculateBasketTotalUSD,
  formatPrice,
  resolveBookableItem,
} from '../utils/bookingLogic';

interface BasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  basketIds: string[];
  onRemoveFromBasket: (id: string) => void;
  onClearBasket: () => void;
  currency: CurrencyCode;
  onProceedToBooking: (primaryItemId?: string) => void;
  onNavigate: (route: RoutePath) => void;
}

export const BasketDrawer: React.FC<BasketDrawerProps> = ({
  isOpen,
  onClose,
  basketIds,
  onRemoveFromBasket,
  onClearBasket,
  currency,
  onProceedToBooking,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const items = basketIds.map((id) => resolveBookableItem(id));
  const totalUSD = calculateBasketTotalUSD(basketIds);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="سلة الباقات والمنتجات"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end"
    >
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-r border-slate-300 flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#145A5D]" />
              <h2 className="text-lg font-extrabold text-[#0F172A]">
                سلة الباقات والمنتجات ({items.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق السلة"
              className="p-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-14 text-center space-y-4">
              <p className="text-sm font-bold text-slate-700">
                السلة فارغة حاليًا. يمكنك إضافة باقة جلسات أو دليل علاجي تطبيقي.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('/products');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#145A5D] text-white text-xs font-extrabold cursor-pointer"
              >
                تصفح المنتجات والباقات
              </button>
            </div>
          ) : (
            <div className="py-5 space-y-3.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F8FAFC] border border-slate-300 rounded-xl p-4 flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#145A5D] block">
                      {item.durationOrFormat}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F172A] mt-0.5">{item.title}</h3>
                    <span className="text-sm font-extrabold text-[#926214] mt-1 block tabular-nums">
                      {formatPrice(item.priceUSD, currency)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveFromBasket(item.id)}
                    aria-label={`حذف ${item.title}`}
                    className="p-2 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={onClearBasket}
                className="text-xs font-bold text-slate-600 hover:text-rose-700 underline cursor-pointer"
              >
                إفراغ السلة بالكامل
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">الإجمالي التقديري:</span>
              <span className="text-2xl font-extrabold text-[#0F172A] tabular-nums">
                {formatPrice(totalUSD, currency)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToBooking(items[0].id);
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-[#145A5D] hover:bg-[#0E3F41] text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>إتمام الحجز والطلب الآن</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
