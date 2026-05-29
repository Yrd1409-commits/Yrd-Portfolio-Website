export type LearningIcon = 'Sparkles' | 'Code2' | 'Workflow';

export interface LearningItem {
  id: string;
  title: string;
  note: string;
  progress: number;
  icon: LearningIcon;
}

export const learning: LearningItem[] = [
  {
    id: 'typescript-fundamentals',
    title: 'Learning TypeScript fundamentals',
    note: 'Typed components, stricter data models, fewer mystery states.',
    progress: 44,
    icon: 'Code2',
  },
  {
    id: 'clinic-crm-app',
    title: 'Migrating clinic CRM to a custom app',
    note: 'Replacing brittle handoffs with clearer intake and follow-up flows.',
    progress: 28,
    icon: 'Workflow',
  },
  {
    id: 'n8n-ops',
    title: 'Shipping cleaner n8n workflows',
    note: 'OAuth, retries, and spreadsheet syncs that operators can trust.',
    progress: 62,
    icon: 'Sparkles',
  },
  {
    id: 'case-study-system',
    title: 'Writing case studies for early builds',
    note: 'Turning specs, experiments, and lessons into useful public notes.',
    progress: 36,
    icon: 'Sparkles',
  },
];
