import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import ScheduleIcon from '@mui/icons-material/Schedule';
import type { SvgIconComponent } from '@mui/icons-material';
import type { UpdateStatus, UpdateCategory } from '@/data/updates';

// Consolidated status configuration for consistent styling across the app
interface StatusConfig {
  icon: SvgIconComponent;
  color: string;
  label: string;
}

export const statusConfig: Record<UpdateStatus, StatusConfig> = {
  completed: { icon: CheckCircleIcon, color: '#4caf50', label: 'Done' },
  'in-progress': { icon: BuildIcon, color: '#00f7ff', label: 'In Progress' },
  planned: { icon: ScheduleIcon, color: '#666666', label: 'Planned' },
};

// Helper to get just the colors (for backward compatibility)
export const statusColors: Record<UpdateStatus, string> = {
  completed: statusConfig.completed.color,
  'in-progress': statusConfig['in-progress'].color,
  planned: statusConfig.planned.color,
};

// Category colors for chips
export const categoryColors: Record<UpdateCategory, string> = {
  feature: '#2047f4',
  enhancement: '#9c27b0',
  bugfix: '#f44336',
  design: '#ff9800',
  ux: '#e91e63',
  infrastructure: '#607d8b',
};
