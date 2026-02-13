import React from 'react'
import CategoryCard from './CategoryCard'
import { Boxes, Folder } from 'lucide-react'
import HeroSection from './HeroSection'
import { adminGetRootFolder } from '@/actions/folder-actions'

const CategorySelection = async () => {

    const folderContents = await adminGetRootFolder();
    const folders = folderContents.folders.filter(f => f.isactive === 1);
    return (
        <div className='flex flex-col gap-6 pb-20'>

            {/* Category Grid */}
            {/* Category Banner Strip */}
            <div className="w-full bg-primary text-primary-foreground py-3 shadow-md">
                <div className='container mx-auto max-w-full px-4 flex items-center gap-3'>
                    <Boxes className="w-5 h-5 text-primary-foreground/90" />
                    <h2 className="text-xl font-medium tracking-wide">หมวดหมู่เอกสาร</h2>
                </div>
            </div>

            <div className='container mx-auto max-w-[1920px] px-4'>
                {/* Category Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {folders.map((folder) => (
                        <CategoryCard
                            key={folder.id}
                            title={folder.name}
                            description={folder.description}
                            href={`/downloads/${folder.id}`}
                            icon={<Folder />}
                            mui_icon={folder.mui_icon}
                            mui_colour={folder.mui_colour}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategorySelection