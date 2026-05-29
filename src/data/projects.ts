export type Category = 'Marketing Project' | 'Automation' | 'Web App / Website';
export type Status = 'Live' | 'In progress' | 'Case study';

export interface Project {
  id: string;
  title: string;
  category: Category;
  status: Status;
  description: string;
  tags: string[];
  media?: { type: 'image' | 'video'; src: string };
  links?: { live?: string; repo?: string; caseStudy?: string };
  date: string;
}

export const projects: Project[] = [
  {
    id: 'ppc-spec-campaign',
    title: 'Spec Google Ads campaign - automotive',
    category: 'Marketing Project',
    status: 'Case study',
    description: 'Intent-segmented ad groups, validated RSAs, negative keyword strategy.',
    tags: ['Google Ads', 'RSA', 'Sub-£0.50 CPC'],
    links: { caseStudy: '#' },
    date: '2026-04',
  },
  {
    id: 'n8n-crm-sync',
    title: 'n8n → Google Sheets CRM automation',
    category: 'Automation',
    status: 'Live',
    description: 'Lead capture to CRM sync with OAuth-handled Sheets node.',
    tags: ['n8n', 'Google Sheets API', 'OAuth'],
    links: { live: '#' },
    date: '2026-05',
  },
  {
    id: 'first-vibe-site',
    title: 'Landing page - vibe-coded',
    category: 'Web App / Website',
    status: 'Live',
    description: 'Dark cinematic one-pager built with React, Tailwind, framer-motion.',
    tags: ['React', 'Tailwind', 'framer-motion'],
    links: { live: '#', repo: '#' },
    date: '2026-05',
  },
];
