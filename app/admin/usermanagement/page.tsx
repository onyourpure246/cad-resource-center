'use client'

import Header from '@/components/Header/Header'
import React, { useState } from 'react'
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout'
import UserActionButtons from '@/components/Admin/UserManagement/UserActionButtons'
import UsersTable from '@/components/Admin/UserManagement/UsersTable'
import { User } from '@/types/user'

const MOCK_USERS: User[] = [
  { id: '1', username: 'admin', email: 'admin@example.com', firstName: 'Admin', lastName: 'System', role: 'admin', status: 'active', createdAt: '2024-01-01' },
  { id: '2', username: 'john_doe', email: 'john@example.com', firstName: 'John', lastName: 'Doe', role: 'editor', status: 'active', createdAt: '2024-02-15' },
  { id: '3', username: 'jane_smith', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', role: 'user', status: 'inactive', createdAt: '2024-03-20' },
  { id: '4', username: 'tester', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', status: 'suspended', createdAt: '2024-04-10' },
]

const UserManagementPage = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [users, setUsers] = useState<User[]>(MOCK_USERS)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])

  return (
    <>
      <Header
        title="จัดการบัญชีผู้ใช้"
        description="จัดการรายชื่อผู้ใช้งานและกำหนดสิทธิ์การเข้าถึง"
      />

      <DataManagementLayout
        searchPlaceholder="ค้นหาผู้ใช้..."
        showBreadcrumbs={false}
        actionButtons={<UserActionButtons selectedIds={selectedIds} />}
      >
        <UsersTable
          items={users}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </DataManagementLayout>
    </>
  )
}

export default UserManagementPage