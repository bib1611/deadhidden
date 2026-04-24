'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { trackConversion, type ConversionProperties } from '@/lib/conversion-events';

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventProperties?: ConversionProperties;
};

type TrackedAnchorProps = ComponentProps<'a'> & {
  eventName: string;
  eventProperties?: ConversionProperties;
};

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackConversion(eventName, eventProperties);
        onClick?.(event);
      }}
    />
  );
}

export function TrackedAnchor({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackConversion(eventName, eventProperties);
        onClick?.(event);
      }}
    />
  );
}
