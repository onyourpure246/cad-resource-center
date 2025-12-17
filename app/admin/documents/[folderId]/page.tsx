'use client';

import React, { useTransition } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ItemsTable from '@/components/Admin/DocManagement/ItemsTable';
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout';
import { Item as FolderItem } from '@/types/documents';
import ActionButtons from '@/components/Admin/DocManagement/ActionButtons';
import Header from '@/components/Header/Header';
import { useFolderContents } from '@/hooks/useFolderContents';
import { useTableData } from '@/hooks/useTableData';
import PaginationFooter from '@/components/Admin/DocManagement/PaginationFooter';

const FolderContentPage = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const params = useParams();
    const folderId = parseInt(params.folderId as string, 10);
    const [selectedIds, setSelectedIds] = React.useState<(string | number)[]>([]);

    const { items, isLoading, breadcrumbs, refresh, currentFolder } = useFolderContents(folderId);
    const {
        handleSearch,
        sortConfig,
        handleSort,
        currentPage,
        setCurrentPage,
        paginatedItems,
        totalPages,
        sortedItems
    } = useTableData(items);

    const handleItemClick = (item: FolderItem) => {
        if (item.type === 'folder') {
            // Navigate to the sub-folder
            startTransition(() => {
                router.push(`/admin/documents/${item.id}?abbr=${item.abbr || ''}`);
            });
        } else {
            console.log(`Clicked on file: ${item.name} (ID: ${item.id})`);
        }
    };

    const selectedItems = items.filter(item => selectedIds.includes(item.id));

    return (
        <>
            <Header
                title="เอกสารทั้งหมด"
                description="จัดการเอกสารและไฟล์ทั้งหมดในระบบ"
            >
            </Header>
            <DataManagementLayout
                searchPlaceholder="ค้นหาในโฟลเดอร์นี้..."
                actionButtons={<ActionButtons parentId={folderId} onRefresh={refresh} selectedItems={selectedItems} />}
                breadcrumbs={breadcrumbs}
                onSearchChange={handleSearch}
                footer={
                    !isLoading && sortedItems.length > 0 && (
                        <PaginationFooter
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )
                }
            >
                <ItemsTable
                    items={paginatedItems}
                    isLoading={isLoading}
                    parentId={folderId}
                    onItemClick={handleItemClick}
                    onRefresh={refresh}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                />
            </DataManagementLayout>
        </>
    );
};

export default FolderContentPage;
