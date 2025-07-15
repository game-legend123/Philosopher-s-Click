'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { BookOpen, LoaderCircle } from 'lucide-react';
import { generatePhilosophicalQuestion } from '@/ai/flows/generate-philosophical-question';
import { curatePhilosophicalQuestion } from '@/ai/flows/curate-philosophical-question';
import { useToast } from '@/hooks/use-toast';
import QuestionDialog from './question-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QUESTION_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
const RESPONSE_TIME_SECONDS = 60;

export default function GameView() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESPONSE_TIME_SECONDS);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const responseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleReset = useCallback((message: string) => {
    toast({
      title: 'A New Beginning',
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
      title: 'The cosmos is brewing a thought...',
    });
    try {
      const { question: generatedQuestion } = await generatePhilosophicalQuestion({ gameName: "Philosopher's Click" });
      const { curatedQuestion, isValid } = await curatePhilosophicalQuestion({ question: generatedQuestion });
      
      if (isValid && curatedQuestion) {
        setQuestion(curatedQuestion);
        setIsAnswering(true);
      } else {
        toast({
          title: 'A Fleeting Thought',
          description: "The generated question wasn't profound enough. The cycle continues.",
          variant: 'default',
        });
      }
    } catch (error) {
      console.error("Error generating question:", error);
      toast({
        title: 'Cosmic Silence',
        description: 'Could not generate a question. You are spared, for now.',
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
            handleReset("Silence is an answer. The universe resets.");
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
      handleReset('An empty answer echoes in the void. The game resets.');
      return;
    }
    toast({
      title: 'Contemplation Received',
      description: 'Your insight is noted. The journey continues.',
      duration: 5000,
    });
    setIsAnswering(false);
    setQuestion(null);
    if (responseTimerRef.current) clearInterval(responseTimerRef.current);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 sm:p-8">
      <header className="absolute top-8 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Philosopher's Click</h1>
        <p className="text-muted-foreground mt-2">Accumulate points, ponder existence.</p>
      </header>

      <main className="flex flex-col items-center justify-center text-center">
        <Card className="w-80 md:w-96 shadow-xl border-primary/20 transition-all duration-500 hover:shadow-2xl hover:border-primary/40">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-muted-foreground">
              <BookOpen className="w-6 h-6" />
              <span>Score of Contemplation</span>
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
            <span>Awaiting cosmic wisdom...</span>
          </div>
        )}
      </main>

      <QuestionDialog
        isOpen={isAnswering}
        question={question}
        timeLeft={timeLeft}
        onSubmit={handleSubmitAnswer}
        onClose={() => handleReset("Dismissing a question is dismissing a part of yourself. The game resets.")}
      />

      <footer className="absolute bottom-8 text-center text-sm text-muted-foreground px-4">
        <p>A question appears every 10 minutes. Answer within 60 seconds or face a reset.</p>
        <p>Built with Next.js & Genkit.</p>
      </footer>
    </div>
  );
}
