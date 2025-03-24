
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import QuestionUpload from '@/components/admin/question-upload';

const QuestionsPage = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Question Management</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage test question sets.
          </p>
        </div>
        
        <QuestionUpload />
      </div>
    </DashboardLayout>
  );
};

export default QuestionsPage;
