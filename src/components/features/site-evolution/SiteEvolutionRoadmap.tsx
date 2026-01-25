'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Tag from '@/components/ui/Tag';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  getRoadmapUpdates,
  getBacklogUpdates,
  getIceboxUpdates,
  type Update,
  type UpdatePriority,
} from '@/data/updates';

const priorityConfig: Record<UpdatePriority, { color: string; label: string }> = {
  high: { color: '#ef4444', label: 'High' },
  medium: { color: '#f59e0b', label: 'Medium' },
  low: { color: '#6b7280', label: 'Low' },
};

interface RoadmapItemProps {
  item: Update;
  showVersion?: boolean;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ item, showVersion = true }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2.5,
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: alpha(theme.palette.secondary.main, 0.3),
          backgroundColor: alpha(theme.palette.secondary.main, 0.02),
        },
      }}
    >
      <Stack spacing={1.5}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              {showVersion && item.version && (
                <Tag
                  label={item.version}
                  size="small"
                  variant="secondary"
                  sx={{ fontWeight: 600, fontSize: '0.75rem', height: 24 }}
                />
              )}
              {item.priority && (
                <Tag
                  icon={<CircleIcon sx={{ fontSize: 8 }} />}
                  label={priorityConfig[item.priority].label}
                  size="small"
                  variant={
                    item.priority === 'high'
                      ? 'error'
                      : item.priority === 'medium'
                        ? 'warning'
                        : 'default'
                  }
                  sx={{ fontSize: '0.7rem', height: 22, '& .MuiChip-icon': { ml: 0.5 } }}
                />
              )}
              <Tag
                label={item.status}
                size="small"
                variant={item.status === 'in-progress' ? 'secondary' : 'default'}
                sx={{ fontSize: '0.7rem', height: 22 }}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {item.title}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>

        {item.details && item.details.length > 0 && (
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            {item.details.map((detail, idx) => (
              <Box component="li" key={idx} sx={{ fontSize: '0.85rem', mb: 0.25 }}>
                {detail}
              </Box>
            ))}
          </Box>
        )}

        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {item.tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              size="small"
              variant="secondary"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, description, count }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
        {icon}
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Tag
          label={String(count)}
          size="small"
          variant="secondary"
          sx={{ fontWeight: 600, fontSize: '0.8rem', height: 24, minWidth: 28 }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

const SiteEvolutionRoadmap: React.FC = () => {
  const theme = useTheme();

  const roadmapItems = getRoadmapUpdates().filter((u) => u.status === 'planned' || u.status === 'in-progress');
  const backlogItems = getBacklogUpdates().sort((a, b) => {
    const priorityOrder: Record<UpdatePriority, number> = { high: 0, medium: 1, low: 2 };
    return (priorityOrder[a.priority || 'low']) - (priorityOrder[b.priority || 'low']);
  });
  const iceboxItems = getIceboxUpdates();

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Committed / Roadmap Section */}
          <Box>
            <SectionHeader
              icon={<RocketLaunchIcon sx={{ color: 'secondary.main', fontSize: 28 }} />}
              title="Committed"
              description="Versioned work planned for upcoming releases"
              count={roadmapItems.length}
            />
            <Stack spacing={2}>
              {roadmapItems.map((item) => (
                <RoadmapItem key={item.id} item={item} showVersion={true} />
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Backlog Section */}
          <Box>
            <SectionHeader
              icon={<PlaylistAddCheckIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />}
              title="Backlog"
              description="Prioritized features to be pulled into roadmap when ready"
              count={backlogItems.length}
            />
            <Stack spacing={2}>
              {backlogItems.map((item) => (
                <RoadmapItem key={item.id} item={item} showVersion={false} />
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Icebox Section */}
          <Box>
            <SectionHeader
              icon={<LightbulbIcon sx={{ color: theme.palette.info.main, fontSize: 28 }} />}
              title="Icebox"
              description="Ideas and possibilities for future consideration"
              count={iceboxItems.length}
            />
            <List sx={{ bgcolor: 'transparent' }}>
              {iceboxItems.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    px: 0,
                    py: 1,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                  <Stack direction="row" spacing={0.5}>
                    {item.tags.slice(0, 2).map((tag) => (
                      <Tag
                        key={tag}
                        label={tag}
                        size="small"
                        variant="secondary"
                        sx={{ fontSize: '0.65rem', height: 18 }}
                      />
                    ))}
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SiteEvolutionRoadmap;
