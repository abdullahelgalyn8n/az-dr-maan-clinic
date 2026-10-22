/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CurrencyCode, RoutePath } from './data/siteData';
import { normalizeRoutePath } from './utils/bookingLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageUrlBanner, ROUTE_META } from './components/SharedSections';
import { BasketDrawer } from './components/BasketDrawer';
import {
  BookingPage,
  ConfirmedBookingRecord,
  ContactPage,
  FaqPage,
  HomePage,
  PricingPage,
  ProductsPage,
  ServicesPage,
  WhyMePage,
} from './components/PagesView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() =>
    normalizeRoutePath(window.location.pathname)
  );
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [basketIds, setBasketIds] = useState<string[]>([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [selectedBookingItemId, setSelectedBookingItemId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('item') || 'session-free-intro';
  });
  const [savedBookings, setSavedBookings] = useState<ConfirmedBookingRecord[]>([]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeRoutePath(window.location.pathname));
      const params = new URLSearchParams(window.location.search);
      const itemParam = params.get('item');
      if (itemParam) {
        setSelectedBookingItemId(itemParam);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const meta = ROUTE_META[currentRoute];
    if (meta) {
      document.title = `د. معن الخفاف | ${meta.title}`;
    }
  }, [currentRoute]);

  const navigateTo = (route: RoutePath, params?: { itemId?: string }) => {
    if (params?.itemId) {
      setSelectedBookingItemId(params.itemId);
    }
    const nextUrl =
      route === '/booking' && params?.itemId
        ? `${route}?item=${encodeURIComponent(params.itemId)}`
        : route;
    window.history.pushState({}, '', nextUrl);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBasket = (productId: string) => {
    setBasketIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  };

  const handleRemoveFromBasket = (productId: string) => {
    setBasketIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearBasket = () => {
    setBasketIds([]);
  };

  const handleSaveBooking = (record: ConfirmedBookingRecord) => {
    setSavedBookings((prev) => [record, ...prev]);
  };

  return (
    <div dir="rtl" className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        basketCount={basketIds.length}
        onOpenBasket={() => setBasketOpen(true)}
      />

      <PageUrlBanner currentRoute={currentRoute} onNavigate={navigateTo} />

      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            currency={currency}
            onCurrencyChange={setCurrency}
            onNavigate={navigateTo}
            onAddToBasket={handleAddToBasket}
            basketIds={basketIds}
          />
        )}

        {currentRoute === '/why-me' && <WhyMePage onNavigate={navigateTo} />}

        {currentRoute === '/services' && <ServicesPage onNavigate={navigateTo} />}

        {currentRoute === '/products' && (
          <ProductsPage
            currency={currency}
            onAddToBasket={handleAddToBasket}
            onNavigate={navigateTo}
            basketIds={basketIds}
          />
        )}

        {currentRoute === '/pricing' && (
          <PricingPage
            currency={currency}
            onCurrencyChange={setCurrency}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === '/faq' && <FaqPage onNavigate={navigateTo} />}

        {currentRoute === '/booking' && (
          <BookingPage
            currency={currency}
            initialItemId={selectedBookingItemId}
            onSaveBooking={handleSaveBooking}
            savedBookings={savedBookings}
          />
        )}

        {currentRoute === '/contact' && <ContactPage onNavigate={navigateTo} />}
      </main>

      <BasketDrawer
        isOpen={basketOpen}
        onClose={() => setBasketOpen(false)}
        basketIds={basketIds}
        onRemoveFromBasket={handleRemoveFromBasket}
        onClearBasket={handleClearBasket}
        currency={currency}
        onProceedToBooking={(primaryItemId) =>
          navigateTo('/booking', { itemId: primaryItemId || 'session-free-intro' })
        }
        onNavigate={navigateTo}
      />

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
