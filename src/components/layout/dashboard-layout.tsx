
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, isActive }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-gray-600 hover:text-primary hover:bg-gray-100"
      )}
    >
      {icon}
      {label}
      {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'student';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const adminNavItems = [
    { 
      label: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: <LayoutDashboard className="h-4 w-4" /> 
    },
    { 
      label: 'Questions', 
      href: '/admin/questions', 
      icon: <FileText className="h-4 w-4" /> 
    },
    { 
      label: 'Students', 
      href: '/admin/students', 
      icon: <Users className="h-4 w-4" /> 
    },
    { 
      label: 'Results', 
      href: '/admin/results', 
      icon: <BarChart className="h-4 w-4" /> 
    },
  ];
  
  const studentNavItems = [
    { 
      label: 'Dashboard', 
      href: '/student/dashboard', 
      icon: <LayoutDashboard className="h-4 w-4" /> 
    },
    { 
      label: 'My Tests', 
      href: '/student/tests', 
      icon: <FileText className="h-4 w-4" /> 
    },
    { 
      label: 'My Results', 
      href: '/student/results', 
      icon: <BarChart className="h-4 w-4" /> 
    },
  ];
  
  const navItems = role === 'admin' ? adminNavItems : studentNavItems;
  
  const handleLogout = () => {
    // In a real app, add proper logout logic here
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  const userName = JSON.parse(localStorage.getItem('user') || '{}')?.name || 'User';
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className={cn(
        "hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white border-r shadow-sm",
      )}>
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center justify-center px-4">
            <Logo />
          </div>
          <div className="mt-8 flex flex-col px-3 flex-grow">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={currentPath === item.href}
                />
              ))}
            </div>
            
            <div className="mt-auto pb-6">
              <Separator className="my-6" />
              <NavItem
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
                href={`/${role}/settings`}
                isActive={currentPath === `/${role}/settings`}
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 mt-2 w-full rounded-md text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-200",
        sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <aside className={cn(
          "fixed inset-y-0 left-0 z-[90] w-full xs:w-[300px] glassmorphism p-6 shadow-xl transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between">
            <Logo />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(false)}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-8 space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={currentPath === item.href}
              />
            ))}
            
            <Separator className="my-6" />
            
            <NavItem
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              href={`/${role}/settings`}
              isActive={currentPath === `/${role}/settings`}
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 mt-2 w-full rounded-md text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(true)}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="ml-2 md:ml-0 text-lg font-medium capitalize">
                {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <div className="text-sm text-right">
                  <p className="text-gray-500">Welcome back,</p>
                  <p className="font-semibold">{userName}</p>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
