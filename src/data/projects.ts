export type Category = 'Marketing Project' | 'Automation' | 'Web App / Website';
export type Status = 'Live' | 'In progress' | 'Case study';

export interface Project {
  id: string;
  title: string;
  category: Category;
  status: Status;
  description: string;
  tags: string[];
  media?: { type: 'image' | 'video'; src: string; fit?: 'cover' | 'contain' };
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
    id: 'aligngrowth-booking-recovery',
    title: 'AlignGrowth booking recovery MVP',
    category: 'Automation',
    status: 'Case study',
    description: 'n8n proof-of-concept for recovering bookings, missed calls and cancellations.',
    tags: ['n8n', 'Webhooks', 'Google Sheets', 'Lead Recovery'],
    media: { type: 'image', src: '/projects/aligngrowth-flow-new-booking.png' },
    links: { caseStudy: '/work/aligngrowth-booking-recovery' },
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
