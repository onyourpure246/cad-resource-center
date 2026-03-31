import React from 'react';
import Header from '@/components/Layout/Header/Header';
import DownloadList from './DownloadLists';
import SubFolderBadges from './SubFolderBadges';
import { DownloadItem, Folder } from '@/types/models';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface SharedDownloadViewProps {
    title: string;
    description: string;
    items: DownloadItem[];
    backLink?: string;
    subFolders?: Folder[]; // Keep flexible based on Folder model
    parentFolderId?: number; // Needed for SubFolderBadges
    highlightQuery?: string;
}

const SharedDownloadView: React.FC<SharedDownloadViewProps> = ({
    title,
    description,
    items,
    backLink,
    subFolders,
    parentFolderId,
    highlightQuery
}) => {
    return (
        <div className="container mx-auto px-10 py-8 max-w-[1920px] animate-in fade-in duration-500">
            <Header
                title={title}
                description={description}
            />
            <div className="container mx-auto px-2 py-4 max-w-[1920px]">
                {subFolders && subFolders.length > 0 && parentFolderId !== undefined ? (
                    <SubFolderBadges
                        subFolders={subFolders}
                        parentFolderId={parentFolderId}
                        backLink={backLink || '/downloads'}
                    />
                ) : (
                    backLink && (
                        <div className="mb-4 flex flex-col gap-4">
                            <div className="flex items-center">
                                <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-primary transition-colors group">
                                    <Link href={backLink} className="flex items-center gap-1 text-muted-foreground group-hover:text-primary">
                                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                        ย้อนกลับ
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )
                )}

                <DownloadList items={items} highlightQuery={highlightQuery} />
            </div>
        </div>
    );
};

export default SharedDownloadView;
