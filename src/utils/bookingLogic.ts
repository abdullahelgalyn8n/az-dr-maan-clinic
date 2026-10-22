import {
  CURRENCIES,
  CurrencyCode,
  ProductCategory,
  RoutePath,
  SESSION_PLANS,
  THERAPEUTIC_PRODUCTS,
  TherapeuticProduct,
} from '../data/siteData';

export interface BookingFormInput {
  fullName: string;
  age: string;
  phone: string;
  email: string;
  problemDescription: string;
  selectedDate: string;
  selectedTime: string;
  sessionFormat: 'zoom' | 'chat' | 'call';
  paymentMethod: 'paypal' | 'card' | 'bank' | 'free';
  selectedItemId: string;
}

export interface ValidationErrors {
  fullName?: string;
  age?: string;
  phone?: string;
  email?: string;
  problemDescription?: string;
  selectedDate?: string;
  selectedTime?: string;
}

export function normalizeRoutePath(rawPath: string): RoutePath {
  const cleaned = rawPath.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const validRoutes: RoutePath[] = [
    '/',
    '/why-me',
    '/services',
    '/products',
    '/pricing',
    '/faq',
    '/booking',
    '/contact',
  ];
  if (cleaned === '/index' || cleaned === '/index.html') return '/';
  if (validRoutes.includes(cleaned as RoutePath)) {
    return cleaned as RoutePath;
  }
  return '/';
}

export function formatPrice(priceUSD: number, currency: CurrencyCode): string {
  if (priceUSD <= 0) {
    return 'مجانًا';
  }
  const info = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = Math.round(priceUSD * info.rateFromUSD);
  if (currency === 'SAR') {
    return `${converted} ر.س`;
  }
  return `${info.symbol}${converted}`;
}

export function filterTherapeuticProducts(
  products: TherapeuticProduct[],
  category: ProductCategory,
  searchQuery: string
): TherapeuticProduct[] {
  const query = searchQuery.trim().toLowerCase();
  return products.filter((p) => {
    const matchesCat = category === 'all' || p.category === category;
    if (!matchesCat) return false;
    if (!query) return true;
    const haystack = [
      p.title,
      p.subtitle,
      p.categoryLabel,
      p.targetAudience,
      ...p.highlights,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });
}

export function resolveBookableItem(itemId: string): {
  id: string;
  title: string;
  subtitle: string;
  priceUSD: number;
  durationOrFormat: string;
  isProduct: boolean;
} {
  const plan = SESSION_PLANS.find((s) => s.id === itemId);
  if (plan) {
    return {
      id: plan.id,
      title: plan.title,
      subtitle: plan.subtitle,
      priceUSD: plan.priceUSD,
      durationOrFormat: `${plan.durationMinutes} دقيقة`,
      isProduct: false,
    };
  }
  const product = THERAPEUTIC_PRODUCTS.find((p) => p.id === itemId);
  if (product) {
    return {
      id: product.id,
      title: product.title,
      subtitle: product.subtitle,
      priceUSD: product.priceUSD,
      durationOrFormat: product.durationOrFormat,
      isProduct: true,
    };
  }
  const fallback = SESSION_PLANS[0];
  return {
    id: fallback.id,
    title: fallback.title,
    subtitle: fallback.subtitle,
    priceUSD: fallback.priceUSD,
    durationOrFormat: `${fallback.durationMinutes} دقيقة`,
    isProduct: false,
  };
}

export function calculateBasketTotalUSD(itemIds: string[]): number {
  return itemIds.reduce((sum, id) => {
    const item = resolveBookableItem(id);
    return sum + item.priceUSD;
  }, 0);
}

export function validateBookingForm(input: BookingFormInput): {
  valid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!input.fullName || input.fullName.trim().length < 3) {
    errors.fullName = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل)';
  }

  const ageNum = Number(input.age);
  if (!input.age || Number.isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
    errors.age = 'يرجى إدخال عمر صحيح بين 10 و 100 عام';
  }

  const cleanPhone = input.phone.replace(/[\s\-()]/g, '');
  if (!cleanPhone || cleanPhone.length < 7) {
    errors.phone = 'يرجى إدخال رقم موبايل صحيح للتواصل وتأكيد الموعد';
  }

  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = 'يرجى إدخال بريد إلكتروني صحيح';
  }

  if (!input.problemDescription || input.problemDescription.trim().length < 10) {
    errors.problemDescription = 'يرجى كتابة وصف مختصر للمشكلة أو الهدف من الجلسة (10 أحرف على الأقل)';
  }

  if (!input.selectedDate || input.selectedDate.trim().length === 0) {
    errors.selectedDate = 'يرجى اختيار تاريخ أو يوم الجلسة';
  }

  if (!input.selectedTime || input.selectedTime.trim().length === 0) {
    errors.selectedTime = 'يرجى اختيار وقت الجلسة المناسب لك';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateContactForm(input: {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'يرجى إدخال الاسم الكامل';
  }
  if (!input.phone || input.phone.trim().length < 7) {
    errors.phone = 'يرجى إدخال رقم الهاتف للتواصل';
  }
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = 'يرجى إدخال بريد إلكتروني صحيح';
  }
  if (!input.message || input.message.trim().length < 5) {
    errors.message = 'يرجى كتابة رسالتك أو استفسارك';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
