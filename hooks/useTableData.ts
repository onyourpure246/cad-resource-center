import { useState, useMemo } from 'react';
import { Item as FolderItem } from '@/types/models';

export const useTableData = (items: FolderItem[], itemsPerPage: number = 10) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof FolderItem; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page on search
    };

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (searchTerm) {
            sortableItems = sortableItems.filter(item =>
                item.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        sortableItems.sort((a, b) => {
            // 1. Always prioritize folders over files
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;

            // 2. Use sortConfig if provided
            if (sortConfig !== null) {
                const aValue = a[sortConfig.key] ?? '';
                const bValue = b[sortConfig.key] ?? '';
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                // If tie, fall through to default alphabetical sort
            }

            // 3. Default alphabetical sort by name
            const aName = (a.name || '').toLowerCase();
            const bName = (b.name || '').toLowerCase();
            if (aName < bName) return -1;
            if (aName > bName) return 1;
            return 0;
        });

        return sortableItems;
    }, [items, searchTerm, sortConfig]);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedItems.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedItems, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    const handleSort = (key: keyof FolderItem) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return {
        searchTerm,
        setSearchTerm,
        sortConfig,
        handleSort,
        currentPage,
        setCurrentPage,
        paginatedItems,
        totalPages,
        sortedItems,
        handleSearch
    };
};
