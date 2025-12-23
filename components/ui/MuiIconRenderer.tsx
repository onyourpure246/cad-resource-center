
'use client';

import React from 'react';
import { SvgIconProps } from '@mui/material';
import dynamic from 'next/dynamic';
import { BrokenImage } from '@mui/icons-material';

// Dynamic imports for icons to avoid massive initial bundle size
const ICON_MAP: Record<string, React.ComponentType<any>> = {
    FolderZip: dynamic(() => import('@mui/icons-material/FolderZip')),
    Folder: dynamic(() => import('@mui/icons-material/Folder')),
    InsertDriveFile: dynamic(() => import('@mui/icons-material/InsertDriveFile')),
    PictureAsPdf: dynamic(() => import('@mui/icons-material/PictureAsPdf')),
    Image: dynamic(() => import('@mui/icons-material/Image')),
    Description: dynamic(() => import('@mui/icons-material/Description')),
    Article: dynamic(() => import('@mui/icons-material/Article')),
    // TableChart: dynamic(() => import('@mui/icons-material/TableChart')),
    // Slideshow: dynamic(() => import('@mui/icons-material/Slideshow')),
    // VideoLibrary: dynamic(() => import('@mui/icons-material/VideoLibrary')),
    // AudioFile: dynamic(() => import('@mui/icons-material/AudioFile')),
    // Code: dynamic(() => import('@mui/icons-material/Code')),
    // TextSnippet: dynamic(() => import('@mui/icons-material/TextSnippet')),
    // Archive: dynamic(() => import('@mui/icons-material/Archive')),
    // HelpOutline: dynamic(() => import('@mui/icons-material/HelpOutline')),
    // Work: dynamic(() => import('@mui/icons-material/Work')),
    // Person: dynamic(() => import('@mui/icons-material/Person')),
    // Settings: dynamic(() => import('@mui/icons-material/Settings')),
    // Home: dynamic(() => import('@mui/icons-material/Home')),
    // Search: dynamic(() => import('@mui/icons-material/Search')),
    // Menu: dynamic(() => import('@mui/icons-material/Menu')),
    // Close: dynamic(() => import('@mui/icons-material/Close')),
    // Add: dynamic(() => import('@mui/icons-material/Add')),
    // Edit: dynamic(() => import('@mui/icons-material/Edit')),
    // Delete: dynamic(() => import('@mui/icons-material/Delete')),
    // Save: dynamic(() => import('@mui/icons-material/Save')),
    // Cancel: dynamic(() => import('@mui/icons-material/Cancel')),
    // Check: dynamic(() => import('@mui/icons-material/Check')),
    // Info: dynamic(() => import('@mui/icons-material/Info')),
    // Warning: dynamic(() => import('@mui/icons-material/Warning')),
    // Error: dynamic(() => import('@mui/icons-material/Error')),
    // Visibility: dynamic(() => import('@mui/icons-material/Visibility')),
    // VisibilityOff: dynamic(() => import('@mui/icons-material/VisibilityOff')),
    // Download: dynamic(() => import('@mui/icons-material/Download')),
    // Upload: dynamic(() => import('@mui/icons-material/Upload')),
    // Share: dynamic(() => import('@mui/icons-material/Share')),
    // Link: dynamic(() => import('@mui/icons-material/Link')),
    // ContentCopy: dynamic(() => import('@mui/icons-material/ContentCopy')),
    // ArrowBack: dynamic(() => import('@mui/icons-material/ArrowBack')),
    // ArrowForward: dynamic(() => import('@mui/icons-material/ArrowForward')),
    // ArrowUpward: dynamic(() => import('@mui/icons-material/ArrowUpward')),
    // ArrowDownward: dynamic(() => import('@mui/icons-material/ArrowDownward')),
    // ExpandLess: dynamic(() => import('@mui/icons-material/ExpandLess')),
    // ExpandMore: dynamic(() => import('@mui/icons-material/ExpandMore')),
    // MoreVert: dynamic(() => import('@mui/icons-material/MoreVert')),
    // MoreHoriz: dynamic(() => import('@mui/icons-material/MoreHoriz')),
    // Refresh: dynamic(() => import('@mui/icons-material/Refresh')),
    // FilterList: dynamic(() => import('@mui/icons-material/FilterList')),
    // Sort: dynamic(() => import('@mui/icons-material/Sort')),
    // ViewList: dynamic(() => import('@mui/icons-material/ViewList')),
    // ViewModule: dynamic(() => import('@mui/icons-material/ViewModule')),
    // GridView: dynamic(() => import('@mui/icons-material/GridView')),
    // Apps: dynamic(() => import('@mui/icons-material/Apps')),
    // Notifications: dynamic(() => import('@mui/icons-material/Notifications')),
    // AccountCircle: dynamic(() => import('@mui/icons-material/AccountCircle')),
    // Logout: dynamic(() => import('@mui/icons-material/Logout')),
    // Login: dynamic(() => import('@mui/icons-material/Login')),
    // Language: dynamic(() => import('@mui/icons-material/Language')),
    // Public: dynamic(() => import('@mui/icons-material/Public')),
    // Lock: dynamic(() => import('@mui/icons-material/Lock')),
    // LockOpen: dynamic(() => import('@mui/icons-material/LockOpen')),
    // VpnKey: dynamic(() => import('@mui/icons-material/VpnKey')),
    // Security: dynamic(() => import('@mui/icons-material/Security')),
    // Shield: dynamic(() => import('@mui/icons-material/Shield')),
    // VerifiedUser: dynamic(() => import('@mui/icons-material/VerifiedUser')),
    // AdminPanelSettings: dynamic(() => import('@mui/icons-material/AdminPanelSettings')),
    // Dashboard: dynamic(() => import('@mui/icons-material/Dashboard')),
    // Assignment: dynamic(() => import('@mui/icons-material/Assignment')),
    // Assessment: dynamic(() => import('@mui/icons-material/Assessment')),
    // DateRange: dynamic(() => import('@mui/icons-material/DateRange')),
    // Event: dynamic(() => import('@mui/icons-material/Event')),
    // Schedule: dynamic(() => import('@mui/icons-material/Schedule')),
    // Timer: dynamic(() => import('@mui/icons-material/Timer')),
    // AccessTime: dynamic(() => import('@mui/icons-material/AccessTime')),
    // Place: dynamic(() => import('@mui/icons-material/Place')),
    // LocationOn: dynamic(() => import('@mui/icons-material/LocationOn')),
    // Map: dynamic(() => import('@mui/icons-material/Map')),
    // Phone: dynamic(() => import('@mui/icons-material/Phone')),
    // Email: dynamic(() => import('@mui/icons-material/Email')),
    // ContactMail: dynamic(() => import('@mui/icons-material/ContactMail')),
    // ContactPhone: dynamic(() => import('@mui/icons-material/ContactPhone')),
    // Business: dynamic(() => import('@mui/icons-material/Business')),
    // Domain: dynamic(() => import('@mui/icons-material/Domain')),
    // School: dynamic(() => import('@mui/icons-material/School')),
    // LocalLibrary: dynamic(() => import('@mui/icons-material/LocalLibrary')),
    // LocalOffer: dynamic(() => import('@mui/icons-material/LocalOffer')),
    // Category: dynamic(() => import('@mui/icons-material/Category')),
    // Label: dynamic(() => import('@mui/icons-material/Label')),
    // Bookmarks: dynamic(() => import('@mui/icons-material/Bookmarks')),
    // Star: dynamic(() => import('@mui/icons-material/Star')),
    // StarBorder: dynamic(() => import('@mui/icons-material/StarBorder')),
    // ThumbUp: dynamic(() => import('@mui/icons-material/ThumbUp')),
    // ThumbDown: dynamic(() => import('@mui/icons-material/ThumbDown')),
    // Comment: dynamic(() => import('@mui/icons-material/Comment')),
    // Forum: dynamic(() => import('@mui/icons-material/Forum')),
    // Chat: dynamic(() => import('@mui/icons-material/Chat')),
    // QuestionAnswer: dynamic(() => import('@mui/icons-material/QuestionAnswer')),
    // Send: dynamic(() => import('@mui/icons-material/Send')),
    // Drafts: dynamic(() => import('@mui/icons-material/Drafts')),
    // Inbox: dynamic(() => import('@mui/icons-material/Inbox')),
    // Mail: dynamic(() => import('@mui/icons-material/Mail')),
    // MarkEmailRead: dynamic(() => import('@mui/icons-material/MarkEmailRead')),
    // MarkEmailUnread: dynamic(() => import('@mui/icons-material/MarkEmailUnread'))
};

import { MuiIconRendererProps } from '@/types/components';

const MuiIconRenderer: React.FC<MuiIconRendererProps> = ({ iconName, iconColor, ...props }) => {
    if (!iconName) return null;

    // Direct lookup in the map
    const IconComponent = ICON_MAP[iconName];

    if (!IconComponent) {
        // Warn in development (optional)
        if (process.env.NODE_ENV === 'development') {
            console.warn(`MuiIconRenderer: Icon "${iconName}" not found in whitelist. Using fallback.`);
        }
        // Fallback icon
        return <BrokenImage style={{ color: iconColor }} {...props} />;
    }

    return <IconComponent style={{ color: iconColor }} {...props} />;
};

export default MuiIconRenderer;
