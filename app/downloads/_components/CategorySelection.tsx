import React from 'react'
import { apiGetCategories } from '@/services/document-service'
import CategoryTabsAnimated from './CategoryTabsAnimated';
import { auth } from '@/auth';
import { isSuperAdminRole } from '@/lib/auth-helpers';

const CategorySelection = async () => {

    // Fetch real categories from the API
    const categories = await apiGetCategories();
    
    const session = await auth();
    const isSuperAdmin = isSuperAdminRole(session);

    return (
        <div className='container mx-auto max-w-[1920px] px-4 mt-2 relative'>
            <CategoryTabsAnimated categories={categories || []} isSuperAdmin={isSuperAdmin} />
        </div>
    )
}

export default CategorySelection