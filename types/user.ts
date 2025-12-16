export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string; // ชื่อจริง
    lastName?: string; // นามสกุล (Optional)
    role: 'admin' | 'user' | 'editor'; // Role ของ User
    status: 'active' | 'inactive' | 'suspended';
    createdAt: string;
    lastLogin?: string;
}

export interface UsersTableProps {
    items: User[];
    isLoading: boolean;
    onItemClick?: (item: User) => void;
    onRefresh?: () => void;
}
