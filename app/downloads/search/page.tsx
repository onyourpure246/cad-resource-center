import React from 'react';
import HeroSection from '@/components/DownloadsPage/HeroSection';
import { searchFiles } from '@/actions/search-actions';
import SearchResults from '@/components/DownloadsPage/SearchResults';

import { SearchPageProps } from '@/types/components';

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = typeof params.q === 'string' ? params.q : '';

    const results = await searchFiles(query);

    return (
        <div className="flex flex-col min-h-screen animate-in fade-in duration-500">
            <HeroSection />
            <SearchResults results={results} query={query} />
        </div>
    );
}
