export interface User {
    id: string;
    username: string;
    email: string;
    firstname: string; // ชื่อจริง (API returns lowercase)
    lastname?: string; // นามสกุล (API returns lowercase)
    jobtitle?: string; // ตำแหน่ง
    role: 'admin' | 'user' | 'editor'; // Role ของ User
    status: 'active' | 'inactive' | 'suspended';
    created_at: string; // API returns created_at
    updated_at?: string; // แก้ไขเมื่อ
    lastLogin?: string;
}

export interface UsersTableProps {
    items: User[];
    isLoading: boolean;
    onItemClick?: (item: User) => void;
    onRefresh?: () => void;
    selectedIds: (string | number)[];
    onSelectionChange: (ids: (string | number)[]) => void;
}
