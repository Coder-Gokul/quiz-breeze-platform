
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import StudentManagement from '@/components/admin/student-management';

const StudentsPage = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage student accounts and credentials.
          </p>
        </div>
        
        <StudentManagement />
      </div>
    </DashboardLayout>
  );
};

export default StudentsPage;
