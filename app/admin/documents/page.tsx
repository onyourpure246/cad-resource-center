'use client';
import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout';
import ItemsTable from '@/components/Admin/DocManagement/ItemsTable';
import Header from '@/components/Header/Header';
import { useRootDocuments } from '@/hooks/useRootDocuments';
import ActionButtons from '@/components/Admin/DocManagement/ActionButtons';
import { Item } from '@/types/documents';
import { toast } from 'sonner';

const DocumentManagementPage = () => {
    const { items, isLoading, error, refreshItems } = useRootDocuments();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    React.useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleItemClick = (item: Item) => {
        if (item.type === 'folder') {
            startTransition(() => {
                router.push(`/admin/documents/${item.id}`);
            });
        }
    };

    return (
        <>
            <Header
                title="เอกสารทั้งหมด"
                description="จัดการเอกสารและไฟล์ทั้งหมดในระบบ" />

            <DataManagementLayout
                searchPlaceholder="ค้นหาเอกสาร..."
                actionButtons={<ActionButtons parentId={null} onRefresh={refreshItems} />} >
                <ItemsTable
                    items={items}
                    parentId={null}
                    isLoading={isLoading}
                    onItemClick={handleItemClick}
                    onRefresh={refreshItems}
                />
            </DataManagementLayout>
        </>
    );
};

export default DocumentManagementPage;