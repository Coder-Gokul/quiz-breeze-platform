
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  X,
  LayoutDashboard
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';

interface TestQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface TestInterfaceProps {
  testId: string;
  testName: string;
  timeLimit: number; // in minutes
  questions: TestQuestion[];
  onComplete: (answers: Record<string, string>) => void;
}

const TestInterface: React.FC<TestInterfaceProps> = ({
  testId,
  testName,
  timeLimit,
  questions,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // in seconds
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const testContainerRef = useRef<HTMLDivElement>(null);
  
  // Format time remaining as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Handle option selection
  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId
    });
  };
  
  // Navigate to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Jump to a specific question
  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  // Submit the test
  const submitTest = () => {
    setIsTestCompleted(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    document.exitFullscreen().catch(err => console.error("Error exiting fullscreen:", err));
    onComplete(selectedAnswers);
  };
  
  // Handle window visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isFullScreen && !isTestCompleted) {
        incrementWarningCount();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isFullScreen, isTestCompleted]);
  
  // Increment warning count and show warning
  const incrementWarningCount = () => {
    if (warningCount < 2) {
      setWarningCount(prevCount => prevCount + 1);
      setShowWarningDialog(true);
    } else {
      // Auto-submit after 2 warnings
      submitTest();
      toast.error("Test submitted due to multiple attempts to leave the test window.");
    }
  };
  
  // Start fullscreen mode
  const enterFullScreen = async () => {
    try {
      if (testContainerRef.current) {
        if (testContainerRef.current.requestFullscreen) {
          await testContainerRef.current.requestFullscreen();
          setIsFullScreen(true);
        }
      }
    } catch (err) {
      console.error("Error entering fullscreen:", err);
      toast.error("Failed to enter fullscreen mode. Please try again.");
    }
  };
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      if (!document.fullscreenElement && isFullScreen && !isTestCompleted) {
        incrementWarningCount();
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [isFullScreen, isTestCompleted]);
  
  // Set up timer
  useEffect(() => {
    if (isFullScreen && !isTestCompleted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - auto submit
            if (timerRef.current) clearInterval(timerRef.current);
            submitTest();
            toast.warning("Time's up! Your test has been submitted automatically.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isFullScreen, isTestCompleted]);
  
  // Calculate progress percentage
  const progressPercentage = ((questions.length - (questions.length - Object.keys(selectedAnswers).length)) / questions.length) * 100;
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Get time display classes
  const getTimeDisplayClasses = () => {
    if (timeRemaining <= 60) { // Last 1 minute
      return "text-red-600";
    } else if (timeRemaining <= 300) { // Last 5 minutes
      return "text-orange-500";
    }
    return "text-gray-900";
  };
  
  return (
    <div ref={testContainerRef} className="min-h-screen flex flex-col">
      {!isFullScreen ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-subtle animate-fade-in">
          <div className="max-w-xl w-full">
            <div className="text-center mb-8">
              <Logo size="lg" />
              <h1 className="mt-6 text-2xl font-bold">{testName}</h1>
              <p className="mt-2 text-gray-600">Ready to begin your test?</p>
            </div>
            
            <div className="bg-white rounded-lg border p-6 mb-6 glassmorphism">
              <h2 className="text-lg font-semibold mb-4">Test Instructions</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                    1
                  </div>
                  <p>You will have <span className="font-medium">{timeLimit} minutes</span> to complete this test once started.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                    2
                  </div>
                  <p>The test contains <span className="font-medium">{questions.length} questions</span>.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-2 mt-0.5">
                    3
                  </div>
                  <p>You may navigate between questions during the test.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-50 flex items-center justify-center text-red-600 mr-2 mt-0.5">
                    !
                  </div>
                  <p className="font-medium text-red-600">Important: Do not close this window or switch to other applications during the test. Doing so will trigger a warning. After two warnings, your test will be automatically submitted.</p>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center">
              <Button 
                onClick={enterFullScreen} 
                size="lg"
                className="px-8 py-6 h-auto text-lg relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/10 group-hover:translate-x-0"></span>
                <span className="relative">START TEST</span>
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                By starting the test, you agree to abide by our test guidelines.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen bg-gray-50 test-fullscreen animate-fade-in">
          {/* Header */}
          <header className="bg-white border-b py-3 px-4 shadow-sm z-10">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Logo size="sm" />
                <div className="text-sm font-medium">{testName}</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 py-1 px-3 rounded-md flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-1.5" />
                    <span className={cn("font-mono font-bold text-sm", getTimeDisplayClasses())}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowConfirmDialog(true)}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Submit Test
                </Button>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Question navigation sidebar */}
            <div className="w-full md:w-64 bg-white border-b md:border-r md:border-b-0 p-4 md:h-full md:overflow-y-auto">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Your Progress</h3>
                <div className="mt-2 relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>{Object.keys(selectedAnswers).length} of {questions.length} answered</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
              </div>
              
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-500">Navigation</h3>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => jumpToQuestion(index)}
                    className={cn(
                      "h-8 w-8 flex items-center justify-center rounded text-sm transition-colors",
                      currentQuestionIndex === index
                        ? "bg-primary text-white"
                        : selectedAnswers[question.id]
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Question and answer area */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto">
              <div className="max-w-3xl mx-auto">
                {currentQuestion && (
                  <div className="bg-white rounded-lg border p-6 shadow-sm animate-fade-in">
                    <div className="mb-6">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="px-2.5 py-1 bg-primary/10 text-primary text-sm font-medium rounded">
                          Question {currentQuestionIndex + 1} of {questions.length}
                        </div>
                      </div>
                      <h2 className="text-lg font-medium">{currentQuestion.text}</h2>
                    </div>
                    
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                          className={cn(
                            "border rounded-md p-4 cursor-pointer transition-all duration-200 option-hover",
                            selectedAnswers[currentQuestion.id] === option.id
                              ? "option-selected border-primary/50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="flex items-center">
                            <div className={cn(
                              "h-5 w-5 rounded-full border flex items-center justify-center mr-3 transition-colors",
                              selectedAnswers[currentQuestion.id] === option.id
                                ? "border-primary bg-primary/10"
                                : "border-gray-300"
                            )}>
                              {selectedAnswers[currentQuestion.id] === option.id && (
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                              )}
                            </div>
                            <div className="text-gray-800">{option.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={goToPreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={cn(
                          "flex items-center",
                          currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                        )}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={goToNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className={cn(
                          "flex items-center",
                          currentQuestionIndex === questions.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                        )}
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Warning Dialog */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent className="sm:max-w-[425px] warning-popup">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Warning
            </DialogTitle>
            <DialogDescription>
              You attempted to leave the test window. Please remain on this page until you complete the test.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-500">
              This is warning {warningCount} of 2. If you attempt to leave the test window again, your test will be automatically submitted.
            </p>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowWarningDialog(false)} className="w-full">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              I Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Submit Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Submit Test?</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your test? You won't be able to change your answers after submission.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-orange-50 border border-orange-100 rounded-md p-4 text-sm text-orange-800">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                </div>
                <div className="ml-3">
                  <p>
                    You've answered {Object.keys(selectedAnswers).length} out of {questions.length} questions.
                    {Object.keys(selectedAnswers).length < questions.length && (
                      <span className="font-semibold"> Some questions are still unanswered.</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="w-full sm:w-auto">
              <X className="h-4 w-4 mr-2" />
              Continue Test
            </Button>
            <Button onClick={submitTest} className="w-full sm:w-auto">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestInterface;
