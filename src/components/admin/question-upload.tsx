import React, { useState, useRef } from 'react';
import { Upload, Check, AlertCircle, X, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  marks: number;
}

interface QuestionSet {
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
}

const QuestionUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      setUploadError('Please upload a JSON file');
      setUploadedFile(null);
      return;
    }

    setUploadedFile(file);
    setUploadError(null);
    setIsUploading(true);
    
    // Read the file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        validateQuestionFormat(jsonData);
        setQuestionSet(jsonData);
        setIsUploading(false);
        toast.success('Question set uploaded successfully!');
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setUploadError('Invalid JSON format. Please check your file.');
        setIsUploading(false);
        setUploadedFile(null);
      }
    };
    
    reader.onerror = () => {
      setUploadError('Error reading the file');
      setIsUploading(false);
      setUploadedFile(null);
    };
    
    reader.readAsText(file);
  };

  const validateQuestionFormat = (data: any) => {
    // This function would validate that the JSON follows the expected format
    // For demo purposes, we're keeping it simple
    if (!data.title || !data.questions || !Array.isArray(data.questions)) {
      throw new Error('Invalid format');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setQuestionSet(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const sampleJson = {
    "title": "JavaScript Basics Test",
    "description": "Test your JavaScript fundamentals",
    "timeLimit": 30,
    "questions": [
      {
        "id": "q1",
        "text": "What is JavaScript?",
        "options": [
          { "id": "a", "text": "A programming language", "isCorrect": true },
          { "id": "b", "text": "A markup language", "isCorrect": false },
          { "id": "c", "text": "A stylesheet language", "isCorrect": false },
          { "id": "d", "text": "A database", "isCorrect": false }
        ],
        "marks": 2
      }
    ]
  };

  const handleCopyExample = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleJson, null, 2));
    toast.success('Example JSON copied to clipboard!');
  };

  const handleDownloadExample = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(sampleJson, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = 'example-question-set.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Questions</TabsTrigger>
          <TabsTrigger value="format">JSON Format</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Upload Question Set</CardTitle>
              <CardDescription>
                Upload a JSON file containing your MCQ questions for students to take
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragging ? 'border-primary bg-primary/5' : 'border-gray-300'
                } ${uploadError ? 'border-red-300 bg-red-50' : ''} transition-colors`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {!uploadedFile ? (
                  <>
                    <div className="mx-auto flex flex-col items-center">
                      <Upload className={`h-12 w-12 mb-4 ${uploadError ? 'text-red-500' : 'text-gray-400'}`} />
                      
                      {uploadError ? (
                        <div className="text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>{uploadError}</span>
                        </div>
                      ) : (
                        <p className="text-gray-500 mb-2">Drag & drop your JSON file here, or click to browse</p>
                      )}
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4"
                      >
                        Browse Files
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-full p-2 mr-3">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {questionSet?.questions.length || 0} questions
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearUpload}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
              
              {questionSet && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border animate-fade-in">
                  <h3 className="font-medium text-lg">{questionSet.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{questionSet.description}</p>
                  <div className="flex items-center mt-2">
                    <div className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
                      {questionSet.timeLimit} minutes
                    </div>
                    <div className="ml-3 bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {questionSet.questions.length} questions
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={clearUpload}>
                Clear
              </Button>
              
              <Button 
                disabled={!questionSet || isUploading} 
                className="relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/10 group-hover:translate-x-0"></span>
                <span className="relative flex items-center">
                  {isUploading ? 'Processing...' : 'Save Question Set'}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="format" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>JSON Format Guide</CardTitle>
              <CardDescription>
                Follow this format when creating your question sets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Example JSON Structure</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyExample} className="flex items-center text-xs">
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadExample} className="flex items-center text-xs">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs sm:text-sm overflow-x-auto">
                  {JSON.stringify(sampleJson, null, 2)}
                </pre>
              </div>
              
              <div className="mt-6 space-y-3">
                <h3 className="font-medium">JSON Schema Requirements:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><span className="font-mono text-primary">title</span>: Test title (string)</li>
                  <li><span className="font-mono text-primary">description</span>: Test description (string)</li>
                  <li><span className="font-mono text-primary">timeLimit</span>: Test duration in minutes (number)</li>
                  <li><span className="font-mono text-primary">questions</span>: Array of question objects with:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li><span className="font-mono text-primary">id</span>: Unique question ID (string)</li>
                      <li><span className="font-mono text-primary">text</span>: Question text (string)</li>
                      <li><span className="font-mono text-primary">options</span>: Array of answer options with:
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li><span className="font-mono text-primary">id</span>: Option ID (string)</li>
                          <li><span className="font-mono text-primary">text</span>: Option text (string)</li>
                          <li><span className="font-mono text-primary">isCorrect</span>: Boolean indicating if option is correct</li>
                        </ul>
                      </li>
                      <li><span className="font-mono text-primary">marks</span>: Point value for question (number)</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionUpload;
