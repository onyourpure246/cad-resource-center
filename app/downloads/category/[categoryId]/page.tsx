import React from 'react';
import { searchFiles } from '@/actions/search-actions';
import { apiGetCategories } from '@/services/document-service';
import { notFound } from 'next/navigation';
import SharedDownloadView from '../../_components/SharedDownloadView';

interface CategoryPageProps {
    params: Promise<{
        categoryId: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const categoryIdNum = parseInt(resolvedParams.categoryId, 10);

    if (isNaN(categoryIdNum)) {
        notFound();
    }

    // Fetch categories to get the name of the selected category
    const categories = await apiGetCategories();
    const currentCategory = categories.find(c => c.id === categoryIdNum);

    if (!currentCategory) {
        notFound();
    }

    // Call searchFiles with empty query and the specific categoryId
    const results = await searchFiles('', categoryIdNum);

    return (
        <SharedDownloadView
            title={`หมวดหมู่: ${currentCategory.name}`}
            description={`เอกสารทั้งหมดในหมวดหมู่นี้จำนวน ${results.length} รายการ`}
            items={results}
            backLink="/downloads"
        />
    );
}
