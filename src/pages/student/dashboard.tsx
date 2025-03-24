
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/dashboard-layout';
import TestCard from '@/components/student/test-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const StudentDashboard = () => {
  const [showTestInfoDialog, setShowTestInfoDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const navigate = useNavigate();
  
  // Mock data for available tests
  const availableTests = [
    {
      id: '1',
      title: 'JavaScript Basics',
      description: 'Test your fundamental JavaScript knowledge including syntax, data types, and functions.',
      timeLimit: 30,
      questionCount: 20,
    },
    {
      id: '2',
      title: 'HTML & CSS Fundamentals',
      description: 'Assess your understanding of HTML structure, CSS styling, and responsive design principles.',
      timeLimit: 25,
      questionCount: 15,
    },
  ];
  
  // Mock data for student's recent activity
  const recentActivity = [
    {
      id: '1',
      title: 'MongoDB Essentials',
      date: 'Oct 15, 2023',
      score: '82%',
      status: 'Completed',
    },
    {
      id: '2',
      title: 'React JS Assessment',
      date: 'Oct 10, 2023',
      score: '75%',
      status: 'Completed',
    },
    {
      id: '3',
      title: 'Node.js Advanced',
      date: 'Oct 5, 2023',
      score: '68%',
      status: 'Completed',
    },
  ];
  
  const handleBeginTest = (test: any) => {
    setSelectedTest(test);
    setShowTestInfoDialog(true);
  };
  
  const startTest = () => {
    setShowTestInfoDialog(false);
    navigate(`/student/test/${selectedTest.id}`);
  };
  
  // Get student name from local storage
  const studentData = JSON.parse(localStorage.getItem('user') || '{}');
  const studentName = studentData.name || 'Student';
  
  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {studentName}!</h1>
          <p className="text-muted-foreground mt-1">
            Your testing dashboard shows available tests and recent activity.
          </p>
        </div>
        
        {/* Available Tests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Available Tests</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTests.map((test) => (
              <TestCard
                key={test.id}
                id={test.id}
                title={test.title}
                description={test.description}
                timeLimit={test.timeLimit}
                questionCount={test.questionCount}
                onBegin={() => handleBeginTest(test)}
              />
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button variant="outline" size="sm" className="text-sm">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-medium">{activity.title}</div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          {activity.date}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {activity.score}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {activity.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Test Information Dialog */}
      {selectedTest && (
        <Dialog open={showTestInfoDialog} onOpenChange={setShowTestInfoDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Test Information</DialogTitle>
              <DialogDescription>
                Please review the test details before starting
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-4">{selectedTest.title}</h3>
              <p className="text-gray-600 mb-6">{selectedTest.description}</p>
              
              <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 mb-3">Test Information</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-blue-700">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Time Limit: <span className="font-medium">{selectedTest.timeLimit} minutes</span></span>
                  </li>
                  <li className="flex items-center text-blue-700">
                    <span className="h-4 w-4 mr-2 flex items-center justify-center">Q</span>
                    <span>Questions: <span className="font-medium">{selectedTest.questionCount} multiple-choice questions</span></span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 rounded-md bg-amber-50 p-4 border border-amber-100">
                <h4 className="text-sm font-medium text-amber-800 mb-2">Important Notes</h4>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• Once started, the timer cannot be paused</li>
                  <li>• Do not close the browser window or navigate away</li>
                  <li>• Ensure you have a stable internet connection</li>
                  <li>• After 2 warnings, the test will be automatically submitted</li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTestInfoDialog(false)}>
                Cancel
              </Button>
              <Button onClick={startTest} className="relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/10 group-hover:translate-x-0"></span>
                <span className="relative">START TEST</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
