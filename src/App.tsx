
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/dashboard";
import QuestionsPage from "./pages/admin/questions";
import StudentsPage from "./pages/admin/students";
import ResultsPage from "./pages/admin/results";

// Student pages
import StudentDashboard from "./pages/student/dashboard";
import TestPage from "./pages/student/test";

// Auth guard for protected routes
const AuthGuard = ({ children, requiredRole }: { children: React.ReactNode, requiredRole: string }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthenticated = !!user.role;
  const hasRequiredRole = user.role === requiredRole;
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && !hasRequiredRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <AuthGuard requiredRole="admin">
              <AdminDashboard />
            </AuthGuard>
          } />
          <Route path="/admin/questions" element={
            <AuthGuard requiredRole="admin">
              <QuestionsPage />
            </AuthGuard>
          } />
          <Route path="/admin/students" element={
            <AuthGuard requiredRole="admin">
              <StudentsPage />
            </AuthGuard>
          } />
          <Route path="/admin/results" element={
            <AuthGuard requiredRole="admin">
              <ResultsPage />
            </AuthGuard>
          } />
          
          {/* Student routes */}
          <Route path="/student/dashboard" element={
            <AuthGuard requiredRole="student">
              <StudentDashboard />
            </AuthGuard>
          } />
          <Route path="/student/test/:testId" element={
            <AuthGuard requiredRole="student">
              <TestPage />
            </AuthGuard>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
