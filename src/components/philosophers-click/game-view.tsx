'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { BookOpen, HelpCircle, LoaderCircle } from 'lucide-react';
import { generatePhilosophicalQuestion } from '@/ai/flows/generate-philosophical-question';
import { curatePhilosophicalQuestion } from '@/ai/flows/curate-philosophical-question';
import { useToast } from '@/hooks/use-toast';
import QuestionDialog from './question-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TutorialDialog from './tutorial-dialog';
import { Button } from '@/components/ui/button';

const QUESTION_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
const RESPONSE_TIME_SECONDS = 60;
const TUTORIAL_KEY = 'philosophers-click-tutorial-seen';

export default function GameView() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESPONSE_TIME_SECONDS);
  const [isLoading, setIsLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const { toast } = useToast();

  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const responseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tutorialSeen = localStorage.getItem(TUTORIAL_KEY);
    if (!tutorialSeen) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialClose = () => {
    localStorage.setItem(TUTORIAL_KEY, 'true');
    setShowTutorial(false);
  };

  const handleReset = useCallback((message: string) => {
    toast({
      title: 'Một Khởi Đầu Mới',
      description: message,
      variant: 'destructive',
      duration: 5000,
    });
    setScore(0);
    setQuestion(null);
    setIsAnswering(false);
    if (responseTimerRef.current) clearInterval(responseTimerRef.current);
    setTimeLeft(RESPONSE_TIME_SECONDS);
  }, [toast]);

  const generateAndAskQuestion = useCallback(async () => {
    setIsLoading(true);
    toast({
      title: 'Vũ trụ đang nghiền ngẫm một ý nghĩ...',
    });
    try {
      const { question: generatedQuestion } = await generatePhilosophicalQuestion({ gameName: "Philosopher's Click" });
      const { curatedQuestion, isValid } = await curatePhilosophicalQuestion({ question: generatedQuestion });
      
      if (isValid && curatedQuestion) {
        setQuestion(curatedQuestion);
        setIsAnswering(true);
      } else {
        toast({
          title: 'Một ý nghĩ thoáng qua',
          description: "Câu hỏi được tạo ra chưa đủ sâu sắc. Vòng lặp tiếp tục.",
          variant: 'default',
        });
      }
    } catch (error) {
      console.error("Lỗi tạo câu hỏi:", error);
      toast({
        title: 'Sự im lặng của vũ trụ',
        description: 'Không thể tạo câu hỏi. Bạn được tạm tha.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Score interval
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setScore(prevScore => prevScore + 1);
    }, 1000);

    return () => clearInterval(scoreInterval);
  }, []);

  // Question interval
  useEffect(() => {
    // For development: trigger question every 15 seconds
    // const interval = 15 * 1000; 
    const interval = QUESTION_INTERVAL_MS;

    if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    questionTimerRef.current = setInterval(() => {
      if (!isAnswering && !isLoading) {
        generateAndAskQuestion();
      }
    }, interval);

    return () => {
      if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    };
  }, [isAnswering, isLoading, generateAndAskQuestion]);

  // Response countdown timer
  useEffect(() => {
    if (isAnswering) {
      setTimeLeft(RESPONSE_TIME_SECONDS);
      responseTimerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(responseTimerRef.current!);
            handleReset("Sự im lặng cũng là một câu trả lời. Vũ trụ tái thiết lập.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (responseTimerRef.current) clearInterval(responseTimerRef.current);
    };
  }, [isAnswering, handleReset]);

  const handleSubmitAnswer = (answer: string) => {
    if (answer.trim() === '') {
      handleReset('Một câu trả lời trống rỗng vang vọng trong hư không. Trò chơi tái thiết lập.');
      return;
    }
    toast({
      title: 'Sự suy ngẫm đã được ghi nhận',
      description: 'Góc nhìn của bạn đã được ghi nhận. Cuộc hành trình tiếp tục.',
      duration: 5000,
    });
    setIsAnswering(false);
    setQuestion(null);
    if (responseTimerRef.current) clearInterval(responseTimerRef.current);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 sm:p-8">
      <header className="absolute top-4 sm:top-8 text-center px-4 w-full flex justify-between items-start">
        <div className="flex-1"></div>
        <div className="flex-1 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Philosopher's Click</h1>
          <p className="text-muted-foreground mt-2">Tích lũy điểm, suy ngẫm về sự tồn tại.</p>
        </div>
        <div className="flex-1 flex justify-end">
           <Button variant="ghost" size="icon" onClick={() => setShowTutorial(true)} aria-label="Hướng dẫn">
             <HelpCircle className="w-6 h-6" />
           </Button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center text-center">
        <Card className="w-80 md:w-96 shadow-xl border-primary/20 transition-all duration-500 hover:shadow-2xl hover:border-primary/40">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-muted-foreground">
              <BookOpen className="w-6 h-6" />
              <span>Điểm Suy Ngẫm</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-7xl md:text-8xl font-bold text-primary transition-colors">
                {score.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        {isLoading && (
          <div className="mt-8 flex items-center gap-2 text-muted-foreground">
            <LoaderCircle className="animate-spin" />
            <span>Đang chờ đợi sự khôn ngoan của vũ trụ...</span>
          </div>
        )}
      </main>

      <QuestionDialog
        isOpen={isAnswering}
        question={question}
        timeLeft={timeLeft}
        onSubmit={handleSubmitAnswer}
        onClose={() => handleReset("Bỏ qua một câu hỏi là bỏ qua một phần của chính mình. Trò chơi tái thiết lập.")}
      />
      
      <TutorialDialog isOpen={showTutorial} onClose={handleTutorialClose} />

      <footer className="absolute bottom-8 text-center text-sm text-muted-foreground px-4">
        <p>Một câu hỏi xuất hiện mỗi 10 phút. Trả lời trong 60 giây hoặc sẽ bị tái thiết lập.</p>
        <p>Được xây dựng với Next.js & Genkit.</p>
      </footer>
    </div>
  );
}
