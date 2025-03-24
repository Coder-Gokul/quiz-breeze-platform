
import React, { useState } from 'react';
import { 
  FileText, Search, Download, Eye, Calendar, Clock, User, X, BarChart, FileBarChart, Printer
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TestResult {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  testName: string;
  startTime: string;
  endTime: string;
  duration: string;
  score: number;
  totalQuestions: number;
  totalMarks: number;
  percentage: number;
  questions: {
    id: string;
    text: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
    marks: number;
  }[];
}

const mockResults: TestResult[] = [
  {
    id: '1',
    studentName: 'John Smith',
    studentEmail: 'john.smith@example.com',
    studentPhone: '+1234567890',
    testName: 'JavaScript Basics',
    startTime: '2023-10-15T10:00:00Z',
    endTime: '2023-10-15T10:45:30Z',
    duration: '45m 30s',
    score: 85,
    totalQuestions: 20,
    totalMarks: 100,
    percentage: 85,
    questions: [
      {
        id: 'q1',
        text: 'What is JavaScript?',
        correctAnswer: 'A programming language',
        userAnswer: 'A programming language',
        isCorrect: true,
        marks: 5
      },
      {
        id: 'q2',
        text: 'Which of the following is a JavaScript framework?',
        correctAnswer: 'React',
        userAnswer: 'React',
        isCorrect: true,
        marks: 5
      },
      {
        id: 'q3',
        text: 'What does DOM stand for?',
        correctAnswer: 'Document Object Model',
        userAnswer: 'Document Object Model',
        isCorrect: true,
        marks: 5
      },
    ]
  },
  {
    id: '2',
    studentName: 'Emily Johnson',
    studentEmail: 'emily.johnson@example.com',
    studentPhone: '+1987654321',
    testName: 'HTML & CSS Fundamentals',
    startTime: '2023-10-16T14:00:00Z',
    endTime: '2023-10-16T14:52:15Z',
    duration: '52m 15s',
    score: 92,
    totalQuestions: 25,
    totalMarks: 100,
    percentage: 92,
    questions: [
      {
        id: 'q1',
        text: 'What does HTML stand for?',
        correctAnswer: 'Hyper Text Markup Language',
        userAnswer: 'Hyper Text Markup Language',
        isCorrect: true,
        marks: 4
      },
      {
        id: 'q2',
        text: 'Which CSS property is used to change the text color?',
        correctAnswer: 'color',
        userAnswer: 'color',
        isCorrect: true,
        marks: 4
      },
      {
        id: 'q3',
        text: 'What is the correct HTML element for the largest heading?',
        correctAnswer: '<h1>',
        userAnswer: '<h1>',
        isCorrect: true,
        marks: 4
      },
    ]
  },
  {
    id: '3',
    studentName: 'Michael Brown',
    studentEmail: 'michael.brown@example.com',
    studentPhone: '+1122334455',
    testName: 'Python Programming',
    startTime: '2023-10-17T09:30:00Z',
    endTime: '2023-10-17T10:15:45Z',
    duration: '45m 45s',
    score: 78,
    totalQuestions: 30,
    totalMarks: 120,
    percentage: 65,
    questions: [
      {
        id: 'q1',
        text: 'What is Python?',
        correctAnswer: 'A programming language',
        userAnswer: 'A programming language',
        isCorrect: true,
        marks: 4
      },
      {
        id: 'q2',
        text: 'Which of the following is a Python data type?',
        correctAnswer: 'List',
        userAnswer: 'Array',
        isCorrect: false,
        marks: 4
      },
      {
        id: 'q3',
        text: 'What is the correct way to create a function in Python?',
        correctAnswer: 'def myFunction():',
        userAnswer: 'def myFunction():',
        isCorrect: true,
        marks: 4
      },
    ]
  },
];

const ResultsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTest, setSelectedTest] = useState<string>('all');
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Filter results based on search query and selected test
  const filteredResults = mockResults.filter(result => {
    const matchesSearch = 
      result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.testName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTest = selectedTest === 'all' || result.testName === selectedTest;
    
    return matchesSearch && matchesTest;
  });
  
  // Get unique test names
  const testNames = Array.from(new Set(mockResults.map(result => result.testName)));
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const generatePDF = () => {
    if (!selectedResult) return;
    
    setIsGeneratingPDF(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsGeneratingPDF(false);
      toast.success('PDF generated successfully!');
    }, 2000);
  };
  
  const getStatusColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-blue-100 text-blue-800';
    if (percentage >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };
  
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search results..."
              className="pl-9 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="w-full sm:w-[200px]">
            <Select value={selectedTest} onValueChange={setSelectedTest}>
              <SelectTrigger>
                <SelectValue placeholder="All Tests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tests</SelectItem>
                {testNames.map(test => (
                  <SelectItem key={test} value={test}>{test}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button variant="outline" className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="m-0">
          <div className="rounded-md border bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <User className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <div className="font-medium text-gray-900">{result.studentName}</div>
                              <div className="text-gray-500 text-sm">{result.studentEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="ml-3 font-medium">{result.testName}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            {formatDate(result.startTime)}
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {result.duration}
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.percentage)}`}>
                              {result.percentage}%
                            </span>
                            <span className="text-gray-500 text-sm">
                              {result.score}/{result.totalMarks}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedResult(result);
                                setIsDialogOpen(true);
                              }}
                              className="text-primary"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            
                            <Button variant="ghost" size="sm" className="text-primary">
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="m-0">
          <div className="rounded-md border bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Show only the most recent results (last 7 days) */}
                  {filteredResults
                    .filter(result => {
                      const resultDate = new Date(result.startTime);
                      const sevenDaysAgo = new Date();
                      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                      return resultDate >= sevenDaysAgo;
                    })
                    .length > 0 ? (
                    filteredResults
                      .filter(result => {
                        const resultDate = new Date(result.startTime);
                        const sevenDaysAgo = new Date();
                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                        return resultDate >= sevenDaysAgo;
                      })
                      .map((result) => (
                        <tr key={result.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="h-4 w-4" />
                              </div>
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">{result.studentName}</div>
                                <div className="text-gray-500 text-sm">{result.studentEmail}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div className="ml-3 font-medium">{result.testName}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              {formatDate(result.startTime)}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              {result.duration}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.percentage)}`}>
                                {result.percentage}%
                              </span>
                              <span className="text-gray-500 text-sm">
                                {result.score}/{result.totalMarks}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedResult(result);
                                  setIsDialogOpen(true);
                                }}
                                className="text-primary"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              
                              <Button variant="ghost" size="sm" className="text-primary">
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No recent results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Result Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Test Result Details</DialogTitle>
            <DialogDescription>
              Detailed results for the selected test attempt.
            </DialogDescription>
          </DialogHeader>
          
          {selectedResult && (
            <div className="py-4">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Student Information</h3>
                    <div className="mt-2 bg-gray-50 rounded-md p-3 border">
                      <p className="font-medium">{selectedResult.studentName}</p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Mail className="h-3.5 w-3.5 mr-1.5" />
                        {selectedResult.studentEmail}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Phone className="h-3.5 w-3.5 mr-1.5" />
                        {selectedResult.studentPhone}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Test Information</h3>
                    <div className="mt-2 bg-gray-50 rounded-md p-3 border">
                      <p className="font-medium">{selectedResult.testName}</p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          {formatDate(selectedResult.startTime)}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          {selectedResult.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Score Summary</h3>
                  <div className="mt-2 bg-gray-50 rounded-md p-4 border h-[calc(100%-24px)] flex flex-col justify-center items-center">
                    <div className="relative h-32 w-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">{selectedResult.percentage}%</div>
                          <div className="text-sm text-gray-500 mt-1">Score</div>
                        </div>
                      </div>
                      <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - selectedResult.percentage / 100)}`}
                          className="text-primary"
                        />
                      </svg>
                    </div>
                    <div className="mt-4 flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1 text-gray-700">
                        <FileBarChart className="h-4 w-4" />
                        <span>{selectedResult.score} out of {selectedResult.totalMarks}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <BarChart className="h-4 w-4" />
                        <span>{selectedResult.totalQuestions} questions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Question Details</h3>
                <div className="border rounded-md divide-y">
                  {selectedResult.questions.map((question, index) => (
                    <div key={question.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium flex items-center">
                            <span className="mr-2">Q{index + 1}.</span>
                            <span>{question.text}</span>
                          </div>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-start">
                              <div className="min-w-[120px] text-sm text-gray-500">Correct Answer:</div>
                              <div className={`text-sm ${question.isCorrect ? 'text-green-600 font-medium' : 'text-gray-900'}`}>
                                {question.correctAnswer}
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="min-w-[120px] text-sm text-gray-500">Student Answer:</div>
                              <div className={`text-sm ${
                                question.isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'
                              }`}>
                                {question.userAnswer}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`ml-4 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full ${
                          question.isCorrect 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {question.isCorrect ? '+' : '×'}{question.marks}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              <Button 
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/10 group-hover:translate-x-0"></span>
                <span className="relative flex items-center">
                  {isGeneratingPDF ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <>
                      <Printer className="h-4 w-4 mr-2" />
                      Generate PDF
                    </>
                  )}
                </span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultsView;
