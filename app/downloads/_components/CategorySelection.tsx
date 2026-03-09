import React from 'react'
import CategoryCard from './CategoryCard'
import { Boxes, Folder } from 'lucide-react'
import { apiGetCategories } from '@/services/document-service'

const CategorySelection = async () => {

    // Fetch real categories from the API
    const categories = await apiGetCategories();
    // Assuming you want to show all categories. Add filter logic if there's an active/inactive flag.

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
                {/* Category Grid */}
                {categories && categories.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {categories.map((category: any) => (
                            <CategoryCard
                                key={category.id}
                                title={category.name}
                                description={category.description || 'ดาวน์โหลดเอกสารในหมวดหมู่นี้'}
                                href={`/downloads/category/${category.id}`} // Links to the true Category Route
                                icon={<Folder />}
                                mui_icon={category.mui_icon}
                                mui_colour={category.mui_colour || '#1976d2'} // Default fallback color
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
                        <p className="text-muted-foreground">ยังไม่มีหมวดหมู่เอกสารในระบบ</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategorySelection