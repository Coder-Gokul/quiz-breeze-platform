
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/ui/logo';

const LoginForm: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'student'>('student');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demonstration purposes only
      // In a real app, this would be handled by your authentication backend
      if (userType === 'admin' && loginIdentifier === 'admin@scorpion.com' && password === 'admin123') {
        localStorage.setItem('user', JSON.stringify({ role: 'admin', name: 'Admin User' }));
        toast.success('Welcome back, Admin!');
        navigate('/admin/dashboard');
      } else if (userType === 'student' && loginIdentifier === 'student@example.com' && password === 'student123') {
        localStorage.setItem('user', JSON.stringify({ role: 'student', name: 'John Smith' }));
        toast.success('Login successful!');
        navigate('/student/dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <Logo size="lg" />
        <h2 className="mt-6 text-3xl font-semibold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">Please sign in to continue</p>
      </div>
      
      <div className="mb-6 flex rounded-lg overflow-hidden border">
        <button
          type="button"
          onClick={() => setUserType('student')}
          className={`flex-1 py-2 px-4 text-center transition-colors ${
            userType === 'student' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Student
        </button>
        <button
          type="button"
          onClick={() => setUserType('admin')}
          className={`flex-1 py-2 px-4 text-center transition-colors ${
            userType === 'admin' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Admin
        </button>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <label htmlFor="loginIdentifier" className="block text-sm font-medium text-gray-700">
            {userType === 'admin' ? 'Email Address' : 'Email or Phone Number'}
          </label>
          <Input
            id="loginIdentifier"
            type="text"
            placeholder={userType === 'admin' ? 'admin@example.com' : 'student@example.com or +1234567890'}
            value={loginIdentifier}
            onChange={(e) => setLoginIdentifier(e.target.value)}
            className="glassmorphism-subtle"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glassmorphism-subtle pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full relative overflow-hidden group"
          disabled={isLoading}
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/10 group-hover:translate-x-0"></span>
          <span className="relative flex items-center justify-center">
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <LogIn size={18} className="mr-2" />
                Sign in
              </>
            )}
          </span>
        </Button>
      </form>
      
      <div className="mt-8 text-sm text-center text-gray-600">
        <p>For demo purposes:</p>
        <p className="mt-1">
          Admin: <span className="text-primary">admin@scorpion.com / admin123</span>
        </p>
        <p className="mt-1">
          Student: <span className="text-primary">student@example.com / student123</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
