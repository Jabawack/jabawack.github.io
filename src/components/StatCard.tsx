'use client';

import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

export interface StatItem {
    value: string | number;
    label: string;
    color?: string;
}

export interface StatCardProps {
    stats: StatItem[];
    children?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ stats, children }) => {
    const gridSize = 12 / stats.length;

    return (
        <Paper sx={{ p: 3 }}>
            <Grid container sx={{ mb: children ? 3 : 0 }}>
                {stats.map((stat, index) => (
                    <Grid key={index} size={gridSize} sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: stat.color || 'text.primary',
                            }}
                        >
                            {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {stat.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            {children}
        </Paper>
    );
};

export default StatCard;
