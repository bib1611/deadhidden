'use client';

import { track as vercelTrack } from '@vercel/analytics';

export type ConversionValue = string | number | boolean | null | undefined;
export type ConversionProperties = Record<string, ConversionValue>;
type CleanProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function cleanProperties(properties: ConversionProperties = {}): CleanProperties {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== null),
  ) as CleanProperties;
}

export function numericPrice(priceLabel: string): number | undefined {
  const parsed = Number(priceLabel.replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function trackConversion(eventName: string, properties: ConversionProperties = {}) {
  const clean = cleanProperties(properties);

  vercelTrack(eventName, clean);

  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, clean);
}
