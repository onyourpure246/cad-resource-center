import React from 'react'
import CategoryCard from './CategoryCard'
import { Folder } from 'lucide-react'
import { adminGetFolderById } from '@/actions/actions'

const CategorySelection = async () => {

    const folderContents = await adminGetFolderById(1);
    const folders = folderContents.folders;
    return (
        <div className='container mx-auto max-w-[1320px] py-10 text-center'>
            <h2 className='text-3xl font-semibold mb-10'>เลือกรายการที่ต้องการดาวน์โหลด</h2>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                {folders.map((folder) => (
                    <CategoryCard
                        key={folder.id}
                        title={folder.name}
                        description={folder.description}
                        href={`/downloads/${folder.id}`}
                        icon={<Folder size={28} />}
                    />
                ))}

                {/* <Link href={`/downloads/${folder.id}`} key={folder.id}>
                            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Folder className="w-8 h-8 text-primary" />
                                    <CardTitle>{folder.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))} */}
            </div>
        </div>
    )
}

export default CategorySelection