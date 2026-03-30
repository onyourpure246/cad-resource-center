'use client'
import React, { useState } from 'react'
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout'
import UserActionButtons from '@/components/Admin/UserManagement/UserActionButtons'
import UsersTable from '@/components/Admin/UserManagement/UsersTable'
import { User } from '@/types/user'
import Header from '@/components/Layout/Header/Header'

import { getUsers } from '@/actions/user-actions'
import { EditUserDialog } from '@/components/Admin/UserManagement/Dialogs/EditUserDialog'

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const data = await getUsers();
      // Since the API returns data in a format that might need mapping depending on strictness,
      // but assuming the backend returns exactly User[] structure for now.
      // If 'data.data' pattern is used in actions, getUsers already extracts it.
      setUsers(data || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchUsers();
  }, [])

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditOpen(true);
  }

  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const fullName = `${user.firstname || ''} ${user.lastname || ''}`.toLowerCase();
    return (
      (user.username && user.username.toLowerCase().includes(q)) ||
      fullName.includes(q) ||
      (user.email && user.email.toLowerCase().includes(q)) ||
      (user.role && user.role.toLowerCase().includes(q)) ||
      (user.jobtitle && user.jobtitle.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <Header
        title="จัดการบัญชีผู้ใช้"
        description="จัดการรายชื่อผู้ใช้งานและกำหนดสิทธิ์การเข้าถึง"
      />

      <DataManagementLayout
        searchPlaceholder="ค้นหาผู้ใช้..."
        showBreadcrumbs={false}
        onSearchChange={setSearchQuery}
        actionButtons={<UserActionButtons selectedIds={selectedIds} onRefresh={fetchUsers} />}
      >
        <UsersTable
          items={filteredUsers}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onItemClick={handleEditUser} // Add this prop to UsersTable or handle via columns?
        // Wait, UsersTable passes onItemClick to columns?
        // userColumns.tsx has helper.actions but we need to pass the handler.
        // We likely need to pass `onEdit` handler to UsersTable -> Columns.
        />

        <EditUserDialog
          user={editingUser}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSuccess={fetchUsers}
        />
      </DataManagementLayout>
    </div>
  )
}

export default UserManagementPage