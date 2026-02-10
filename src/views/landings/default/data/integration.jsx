import SvgIcon from '@/components/SvgIcon';
import { DOCS_URL } from '@/path';

export const integration = {
  headLine: 'Built for Task & Project Management',
  captionLine: 'Streamline tasks, coordinate teams, and track project progress efficiently with our UI Kit designed for modern applications.',
  primaryBtn: {
    children: 'Documentation',
    startIcon: <SvgIcon name="tabler-help" color="background.default" />,
    href: DOCS_URL,
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  tagList: [
    { label: 'Task Management' },
    { label: 'Project Planning' },
    { label: 'Agile & Scrum Boards' },
    { label: 'Kanban Workflows' },
    { label: 'Team Collaboration' },
    { label: 'Time Tracking' },
    { label: 'Resource Management' },
    { label: 'Issue & Bug Tracking' },
    { label: 'Project Reporting' },
    { label: 'Client & Stakeholder Management' },
    { label: 'Workflow Automation' },
    { label: 'Document & File Sharing' },
    { label: 'Communication Tools' },
    { label: 'Gantt Charts & Milestones' },
    { label: 'Remote Team Management' },
    { label: 'Task Prioritization' },
    { label: 'Notifications & Reminders' },
    { label: 'Project Templates' }
  ]
};
