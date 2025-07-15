'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface QuestionDialogProps {
  isOpen: boolean;
  question: string | null;
  timeLeft: number;
  onSubmit: (answer: string) => void;
  onClose: () => void;
}

export default function QuestionDialog({ isOpen, question, timeLeft, onSubmit, onClose }: QuestionDialogProps) {
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if(isOpen) {
      setAnswer('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answer);
  };

  const progressValue = (timeLeft / 60) * 100;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-headline text-primary">Giây phút suy tư</AlertDialogTitle>
          <AlertDialogDescription className="text-lg text-foreground pt-4">
            {question}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <Input
              type="text"
              placeholder="Chia sẻ suy nghĩ của bạn..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="text-base"
              aria-label="Câu trả lời của bạn"
              autoFocus
            />
          </div>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row items-center justify-between w-full mt-6 gap-4">
            <div className="w-full sm:w-auto flex items-center gap-3">
              <span className="text-sm font-mono text-muted-foreground w-12 text-left">{timeLeft}s</span>
              <Progress value={progressValue} className="w-full sm:w-32 h-2" />
            </div>
            <AlertDialogAction asChild>
                <Button type="submit" className="w-full sm:w-auto bg-accent hover:bg-accent/90">
                Gửi câu trả lời
                </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
