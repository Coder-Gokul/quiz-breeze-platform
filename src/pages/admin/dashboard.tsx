
import React from 'react';
import { 
  Users, FileText, Clock, Calendar, BarChart, ChevronRight, Layers, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '248',
      change: '+12%',
      changeDirection: 'up',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active Tests',
      value: '5',
      change: '+2',
      changeDirection: 'up',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Tests Taken',
      value: '1,367',
      change: '+24%',
      changeDirection: 'up',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-violet-50 text-violet-600',
    },
    {
      title: 'Avg. Score',
      value: '72%',
      change: '+3%',
      changeDirection: 'up',
      icon: <BarChart className="h-5 w-5" />,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  const recentTests = [
    {
      id: '1',
      title: 'JavaScript Basics',
      students: 42,
      avgScore: '78%',
      date: 'Oct 15, 2023',
    },
    {
      id: '2',
      title: 'HTML & CSS Fundamentals',
      students: 36,
      avgScore: '82%',
      date: 'Oct 12, 2023',
    },
    {
      id: '3',
      title: 'React JS Assessment',
      students: 28,
      avgScore: '68%',
      date: 'Oct 10, 2023',
    },
    {
      id: '4',
      title: 'Node.js Advanced',
      students: 24,
      avgScore: '72%',
      date: 'Oct 8, 2023',
    },
  ];

  const upcomingTests = [
    {
      id: '1',
      title: 'Data Structures & Algorithms',
      scheduled: 'Oct 25, 2023 - 10:00 AM',
      students: 32,
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      scheduled: 'Oct 28, 2023 - 2:00 PM',
      students: 28,
    },
    {
      id: '3',
      title: 'MongoDB Essentials',
      scheduled: 'Nov 2, 2023 - 11:00 AM',
      students: 18,
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome to the admin portal. Monitor and manage all test activities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 rounded-md", stat.color)}>
                    {stat.icon}
                  </div>
                  <div className={cn(
                    "text-xs font-medium flex items-center gap-1",
                    stat.changeDirection === 'up' ? 'text-emerald-600' : 'text-red-600'
                  )}>
                    {stat.changeDirection === 'up' ? '↑' : '↓'} {stat.change}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold text-3xl">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tests */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Tests</CardTitle>
                  <CardDescription>Latest test results and analytics</CardDescription>
                </div>
                <Button variant="outline" className="text-sm" size="sm">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Score</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentTests.map((test) => (
                      <tr key={test.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
                              <Layers className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{test.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-1.5" />
                            {test.students}
                          </div>
                        </td>
                        <td className="py-3 px-6 whitespace-nowrap">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {test.avgScore}
                          </div>
                        </td>
                        <td className="py-3 px-6 whitespace-nowrap text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1.5" />
                            {test.date}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tests */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Tests</CardTitle>
                  <CardDescription>Scheduled for the next 2 weeks</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{test.title}</h4>
                      <div className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {test.students} students
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      {test.scheduled}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
