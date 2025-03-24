
import React, { useState } from 'react';
import LoginForm from '@/components/auth/login-form';
import Logo from '@/components/ui/logo';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-subtle">
      {/* Left Side - Branding */}
      <div className="w-full md:w-1/2 bg-primary flex flex-col justify-center p-8 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_60%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_60%)]"></div>
        </div>
        <div className="relative z-10 max-w-md mx-auto md:mx-0">
          <Logo size="lg" variant="white" />
          <h1 className="mt-8 text-4xl font-bold text-white tracking-tight">
            Scorpion Infotech Solutions Testing Platform
          </h1>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">
            A secure and intuitive online testing solution designed for comprehensive assessment of technical skills.
          </p>
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-white font-medium text-lg mb-3">Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-white mr-2 mt-0.5">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/90">Secure test environment with anti-cheating measures</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-white mr-2 mt-0.5">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/90">Comprehensive analytics and results tracking</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-white mr-2 mt-0.5">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/90">Detailed PDF reports for candidates</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-white mr-2 mt-0.5">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/90">Easy-to-use admin interface for test management</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 py-12 md:py-24">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
