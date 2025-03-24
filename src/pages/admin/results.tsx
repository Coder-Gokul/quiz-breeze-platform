
import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import ResultsView from '@/components/admin/results-view';

const ResultsPage = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Test Results</h1>
          <p className="text-muted-foreground mt-1">
            View and analyze student test results.
          </p>
        </div>
        
        <ResultsView />
      </div>
    </DashboardLayout>
  );
};

export default ResultsPage;
