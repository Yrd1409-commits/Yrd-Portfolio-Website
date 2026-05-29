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
    id: 'john-clark-audi-google-ads',
    title: 'John Clark Audi - Google Ads account build',
    category: 'Marketing Project',
    status: 'Case study',
    description: 'Upload-ready search campaign architecture for Aberdeen and Dundee Audi.',
    tags: ['Google Ads', 'Search', 'Campaign Architecture', 'Automotive'],
    media: { type: 'image', src: '/projects/john-clark-audi-google-ads.svg' },
    links: { caseStudy: '/work/john-clark-audi-google-ads' },
    date: '2026-05',
  },
  {
    id: 'n8n-crm-sync',
    title: 'n8n to Google Sheets CRM automation',
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
