
import React from 'react';
import { FileText, Clock, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TestCardProps {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questionCount: number;
  onBegin: () => void;
  className?: string;
}

const TestCard: React.FC<TestCardProps> = ({
  id,
  title,
  description,
  timeLimit,
  questionCount,
  onBegin,
  className
}) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border bg-white p-6 test-card",
      "transform transition-all duration-500 hover:shadow-lg",
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full"></div>
      <div className="absolute top-1/2 -right-8 w-24 h-24 bg-primary/5 rounded-full"></div>
      
      <div className="relative flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 rounded-full bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-md bg-gray-50 border flex flex-col">
            <span className="text-xs text-gray-500 uppercase mb-1 tracking-wide">Time</span>
            <div className="flex items-center text-sm font-medium">
              <Clock className="h-3.5 w-3.5 mr-1.5 text-primary" />
              {timeLimit} minutes
            </div>
          </div>
          <div className="p-3 rounded-md bg-gray-50 border flex flex-col">
            <span className="text-xs text-gray-500 uppercase mb-1 tracking-wide">Questions</span>
            <div className="flex items-center text-sm font-medium">
              <CalendarClock className="h-3.5 w-3.5 mr-1.5 text-primary" />
              {questionCount} questions
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            onClick={onBegin} 
            className="w-full relative overflow-hidden group bg-primary hover:bg-primary/90"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/10 group-hover:translate-x-0"></span>
            <span className="relative">Begin Test</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
