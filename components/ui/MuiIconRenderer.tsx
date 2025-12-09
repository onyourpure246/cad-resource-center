'use client';

import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

interface MuiIconRendererProps extends SvgIconProps {
    iconName?: string;
    iconColor?: string;
}

const MuiIconRenderer: React.FC<MuiIconRendererProps> = ({ iconName, iconColor, ...props }) => {
    if (!iconName) return null;

    const IconComponent = (MuiIcons as any)[iconName];

    console.log(`MuiIconRenderer: Rendering ${iconName} with color ${iconColor}`, { found: !!IconComponent });

    if (!IconComponent) {
        // Fallback or return null
        return null;
    }

    return <IconComponent style={{ color: iconColor }} {...props} />;
};

export default MuiIconRenderer;
