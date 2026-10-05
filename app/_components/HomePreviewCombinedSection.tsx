import React from 'react';
import { getAnnouncements } from '@/actions/announcement-actions';
import { getNewScriptFilesGrouped } from '@/actions/file-actions';
import CombinedPreviewClient from './CombinedPreviewClient';

export default async function HomePreviewCombinedSection() {
    const [announcements, categorizedScripts] = await Promise.all([
        getAnnouncements('published'),
        getNewScriptFilesGrouped()
    ]);

    return (
        <CombinedPreviewClient
            announcements={announcements || []}
            categorizedScripts={categorizedScripts || []}
        />
    );
}
