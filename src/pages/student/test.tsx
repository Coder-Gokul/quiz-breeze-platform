
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import TestInterface from '@/components/student/test-interface';

// Mock test data (in a real app, this would come from an API)
const mockTests = {
  '1': {
    id: '1',
    name: 'JavaScript Basics',
    timeLimit: 30, // in minutes
    questions: [
      {
        id: 'q1',
        text: 'What is JavaScript?',
        options: [
          { id: 'a', text: 'A programming language' },
          { id: 'b', text: 'A markup language' },
          { id: 'c', text: 'A stylesheet language' },
          { id: 'd', text: 'A database' }
        ],
      },
      {
        id: 'q2',
        text: 'Which of the following is a JavaScript framework?',
        options: [
          { id: 'a', text: 'React' },
          { id: 'b', text: 'HTML' },
          { id: 'c', text: 'CSS' },
          { id: 'd', text: 'SQL' }
        ],
      },
      {
        id: 'q3',
        text: 'What does DOM stand for?',
        options: [
          { id: 'a', text: 'Document Object Model' },
          { id: 'b', text: 'Data Object Management' },
          { id: 'c', text: 'Digital Output Module' },
          { id: 'd', text: 'Desktop Object Manager' }
        ],
      },
      {
        id: 'q4',
        text: 'Which method is used to add an element at the end of an array?',
        options: [
          { id: 'a', text: 'push()' },
          { id: 'b', text: 'pop()' },
          { id: 'c', text: 'unshift()' },
          { id: 'd', text: 'concat()' }
        ],
      },
      {
        id: 'q5',
        text: 'What is a closure in JavaScript?',
        options: [
          { id: 'a', text: 'A function that has access to variables in its outer scope' },
          { id: 'b', text: 'A way to close a browser window' },
          { id: 'c', text: 'A method to end a loop' },
          { id: 'd', text: 'A special type of object' }
        ],
      },
    ],
  },
  '2': {
    id: '2',
    name: 'HTML & CSS Fundamentals',
    timeLimit: 25, // in minutes
    questions: [
      {
        id: 'q1',
        text: 'What does HTML stand for?',
        options: [
          { id: 'a', text: 'Hyper Text Markup Language' },
          { id: 'b', text: 'Hyper Transfer Markup Language' },
          { id: 'c', text: 'High Text Machine Language' },
          { id: 'd', text: 'Hyper Technical Modern Language' }
        ],
      },
      {
        id: 'q2',
        text: 'Which CSS property is used to change the text color?',
        options: [
          { id: 'a', text: 'color' },
          { id: 'b', text: 'text-color' },
          { id: 'c', text: 'font-color' },
          { id: 'd', text: 'text-style' }
        ],
      },
      {
        id: 'q3',
        text: 'What is the correct HTML element for the largest heading?',
        options: [
          { id: 'a', text: '<h1>' },
          { id: 'b', text: '<heading>' },
          { id: 'c', text: '<head>' },
          { id: 'd', text: '<h6>' }
        ],
      },
      {
        id: 'q4',
        text: 'Which property is used to set the background color in CSS?',
        options: [
          { id: 'a', text: 'background-color' },
          { id: 'b', text: 'bg-color' },
          { id: 'c', text: 'color-background' },
          { id: 'd', text: 'bgcolor' }
        ],
      },
      {
        id: 'q5',
        text: 'What is the purpose of the CSS "display: flex" property?',
        options: [
          { id: 'a', text: 'To create a flexible box layout' },
          { id: 'b', text: 'To make an element disappear' },
          { id: 'c', text: 'To create a table layout' },
          { id: 'd', text: 'To add animations to elements' }
        ],
      },
    ],
  },
};

const TestPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  
  // Get the test data based on the testId
  const test = testId && mockTests[testId as keyof typeof mockTests];
  
  // If no test is found, show an error
  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Test Not Found</h1>
          <p className="text-gray-600 mb-6">The test you're looking for doesn't exist or has been removed.</p>
          <button 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            onClick={() => navigate('/student/dashboard')}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  // Handle test completion
  const handleTestComplete = (answers: Record<string, string>) => {
    // In a real app, this would send the answers to the server
    console.log('Test completed with answers:', answers);
    setIsTestCompleted(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success('Test submitted successfully!');
      navigate('/student/dashboard');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen">
      {!isTestCompleted ? (
        <TestInterface
          testId={test.id}
          testName={test.name}
          timeLimit={test.timeLimit}
          questions={test.questions}
          onComplete={handleTestComplete}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Test Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for completing the test. Your results are being processed.
            </p>
            <button 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              onClick={() => navigate('/student/dashboard')}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
