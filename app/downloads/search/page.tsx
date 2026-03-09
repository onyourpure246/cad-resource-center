import React from 'react';
import { searchFiles } from '@/actions/search-actions';
import SharedDownloadView from '../_components/SharedDownloadView';

import { SearchPageProps } from '@/types/components';

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = typeof params.q === 'string' ? params.q : '';

    const results = await searchFiles(query);

    return (
        <SharedDownloadView
            title={`ผลการค้นหาสำหรับ: "${query}"`}
            description={`พบเอกสารทั้งหมด ${results.length} รายการ`}
            items={results}
            backLink="/downloads"
        />
    );
}
