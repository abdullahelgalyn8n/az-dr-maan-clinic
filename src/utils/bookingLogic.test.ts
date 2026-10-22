import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBasketTotalUSD,
  filterTherapeuticProducts,
  formatPrice,
  normalizeRoutePath,
  resolveBookableItem,
  validateBookingForm,
  validateContactForm,
} from './bookingLogic';
import { THERAPEUTIC_PRODUCTS } from '../data/siteData';

test('normalizeRoutePath resolves all supported clinic routes and defaults cleanly', () => {
  assert.equal(normalizeRoutePath('/'), '/');
  assert.equal(normalizeRoutePath('/index.html'), '/');
  assert.equal(normalizeRoutePath('/why-me/'), '/why-me');
  assert.equal(normalizeRoutePath('/services?tab=anxiety'), '/services');
  assert.equal(normalizeRoutePath('/products'), '/products');
  assert.equal(normalizeRoutePath('/pricing'), '/pricing');
  assert.equal(normalizeRoutePath('/faq'), '/faq');
  assert.equal(normalizeRoutePath('/booking'), '/booking');
  assert.equal(normalizeRoutePath('/contact'), '/contact');
  assert.equal(normalizeRoutePath('/unknown-route'), '/');
});

test('formatPrice handles free introductory session and multi-currency conversion', () => {
  assert.equal(formatPrice(0, 'USD'), 'مجانًا');
  assert.equal(formatPrice(50, 'USD'), '$50');
  assert.equal(formatPrice(50, 'GBP'), '£39');
  assert.equal(formatPrice(50, 'EUR'), '€46');
  assert.equal(formatPrice(50, 'SAR'), '188 ر.س');
});

test('filterTherapeuticProducts filters by category and Arabic search query', () => {
  const bundles = filterTherapeuticProducts(THERAPEUTIC_PRODUCTS, 'bundles', '');
  assert.equal(bundles.length, 4);

  const workbooks = filterTherapeuticProducts(THERAPEUTIC_PRODUCTS, 'workbooks', '');
  assert.equal(workbooks.length, 3);

  const anxietySearch = filterTherapeuticProducts(THERAPEUTIC_PRODUCTS, 'all', 'القلق');
  assert.ok(anxietySearch.length >= 2);
});

test('resolveBookableItem and calculateBasketTotalUSD compute totals accurately', () => {
  const freePlan = resolveBookableItem('session-free-intro');
  assert.equal(freePlan.priceUSD, 0);
  assert.equal(freePlan.isProduct, false);

  const bundle = resolveBookableItem('prod-bundle-4');
  assert.equal(bundle.priceUSD, 170);
  assert.equal(bundle.isProduct, true);

  const total = calculateBasketTotalUSD(['session-60-min', 'prod-workbook-anxiety']);
  assert.equal(total, 74);
});

test('validateBookingForm rejects invalid inputs and accepts valid booking', () => {
  const invalidResult = validateBookingForm({
    fullName: 'أ',
    age: '5',
    phone: '123',
    email: 'bad-email',
    problemDescription: 'قصير',
    selectedDate: '',
    selectedTime: '',
    sessionFormat: 'zoom',
    paymentMethod: 'paypal',
    selectedItemId: 'session-free-intro',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.age);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.problemDescription);
  assert.ok(invalidResult.errors.selectedDate);
  assert.ok(invalidResult.errors.selectedTime);

  const validResult = validateBookingForm({
    fullName: 'أحمد محمد العلي',
    age: '32',
    phone: '+966501234567',
    email: 'ahmed@example.com',
    problemDescription: 'أعاني من قلق مستمر وصعوبة في النوم منذ عدة أشهر وأود بدء خطة علاجية.',
    selectedDate: '2026-10-25',
    selectedTime: '18:00',
    sessionFormat: 'zoom',
    paymentMethod: 'free',
    selectedItemId: 'session-free-intro',
  });
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('validateContactForm validates contact fields properly', () => {
  const bad = validateContactForm({ fullName: '', phone: '12', email: 'not-an-email', message: '' });
  assert.equal(bad.valid, false);

  const good = validateContactForm({
    fullName: 'سارة خالد',
    phone: '+447586405221',
    email: 'sara@example.com',
    message: 'أرغب بالاستفسار عن باقة الجلسات الزوجية ومواعيد المساء.',
  });
  assert.equal(good.valid, true);
});
