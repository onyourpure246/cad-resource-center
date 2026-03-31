import React from 'react'
import { Boxes } from 'lucide-react'
import { apiGetCategories } from '@/services/document-service'
import CategoryTabsAnimated from './CategoryTabsAnimated';

const CategorySelection = async () => {

    // Fetch real categories from the API
    const categories = await apiGetCategories();

    return (
        <div className='flex flex-col gap-6 pb-20'>

            {/* Category Banner Strip */}
            <div className="w-full bg-primary text-primary-foreground py-3 shadow-md">
                <div className='container mx-auto max-w-full px-4 flex items-center gap-3'>
                    <Boxes className="w-5 h-5 text-primary-foreground/90" />
                    <h2 className="text-xl font-medium tracking-wide">หมวดหมู่เอกสาร</h2>
                </div>
            </div>

            <div className='container mx-auto max-w-[1920px] px-4'>
                <CategoryTabsAnimated categories={categories || []} />
            </div>
        </div>
    )
}

export default CategorySelection