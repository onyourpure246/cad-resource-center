import React from 'react'
import CategoryCard from './CategoryCard'
import { Folder } from 'lucide-react'
import HeroSection from './HeroSection'
import { adminGetFolderById } from '@/actions/folder-actions'

const CategorySelection = async () => {

    const folderContents = await adminGetFolderById(1);
    const folders = folderContents.folders;
    return (
        <div className='flex flex-col gap-12 pb-20'>
            {/* Hero Section */}
            <HeroSection />

            {/* Category Grid */}
            <div className='container mx-auto max-w-[1920px] px-4'>
                <div className="flex items-center gap-2 mb-6">
                    <Folder className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">หมวดหมู่เอกสาร</h2>
                </div>

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