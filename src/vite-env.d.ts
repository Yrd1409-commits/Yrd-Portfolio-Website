/// <reference types="vite/client" />

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        class?: string;
        url?: string;
        'loading-anim-type'?: string;
        'events-target'?: string;
        hint?: string;
        logo?: string;
      };
    }
  }
}

export {};
