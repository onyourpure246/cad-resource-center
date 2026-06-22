import React from 'react'
import { apiGetCategories } from '@/services/document-service'
import CategoryTabsAnimated from './CategoryTabsAnimated';

const CategorySelection = async () => {

    // Fetch real categories from the API
    const categories = await apiGetCategories();

    return (
        <div className='container mx-auto max-w-[1920px] px-4 mt-2'>
            <CategoryTabsAnimated categories={categories || []} />
        </div>
    )
}

export default CategorySelection