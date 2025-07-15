'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface TutorialDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialDialog({ isOpen, onClose }: TutorialDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-headline text-primary">Chào mừng đến với Philosopher's Click!</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-base text-foreground pt-4 space-y-3 text-left">
              <p>
                Đây không chỉ là một trò chơi idle thông thường. Đây là một cuộc hành trình vào sâu trong tâm trí bạn.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Tích lũy điểm:</strong> Điểm của bạn tự động tăng theo thời gian. Đây là thước đo cho sự tồn tại của bạn trong thế giới này.</li>
                <li><strong>Đối mặt với câu hỏi:</strong> Cứ sau 5 giây, một câu hỏi triết học sẽ xuất hiện.</li>
                <li><strong>Trả lời hoặc bị tái thiết lập:</strong> Bạn có 60 giây để trả lời. Nếu không trả lời, trả lời trống, hoặc đóng hộp thoại, điểm của bạn sẽ bị reset về 0.</li>
              </ul>
              <p>
                Mục đích không chỉ là tích lũy điểm, mà là để suy ngẫm. Chúc bạn có một hành trình đầy ý nghĩa!
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction asChild>
            <Button onClick={onClose} className="w-full sm:w-auto">Bắt đầu suy ngẫm</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
