// src/ai/flows/curate-philosophical-question.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for curating philosophical questions related to gaming behavior.
 *
 * - curatePhilosophicalQuestion - A function that curates a philosophical question using the Gemini API.
 * - CuratePhilosophicalQuestionInput - The input type for the curatePhilosophicalQuestion function.
 * - CuratePhilosophicalQuestionOutput - The return type for the curatePhilosophicalQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CuratePhilosophicalQuestionInputSchema = z.object({
  question: z.string().describe('Một câu hỏi triết học được tạo ra bởi Gemini API.'),
});
export type CuratePhilosophicalQuestionInput = z.infer<typeof CuratePhilosophicalQuestionInputSchema>;

const CuratePhilosophicalQuestionOutputSchema = z.object({
  curatedQuestion: z.string().describe('Một câu hỏi triết học đã được tuyển chọn nhằm khơi gợi sự suy ngẫm về hành vi chơi game.'),
  isValid: z.boolean().describe('Câu hỏi có hợp lệ hay không')
});
export type CuratePhilosophicalQuestionOutput = z.infer<typeof CuratePhilosophicalQuestionOutputSchema>;

export async function curatePhilosophicalQuestion(input: CuratePhilosophicalQuestionInput): Promise<CuratePhilosophicalQuestionOutput> {
  return curatePhilosophicalQuestionFlow(input);
}

const questionFilterTool = ai.defineTool(
  {
    name: 'isGamingRelated',
    description: 'Kiểm tra xem một câu hỏi có liên quan đến hành vi chơi game không.',
    inputSchema: z.object({
      question: z.string().describe('Câu hỏi cần kiểm tra.'),
    }),
    outputSchema: z.boolean(),
  },
  async (input) => {
    // Implement logic to determine if the question is related to gaming behavior.
    // This could involve keyword analysis or connecting to a database of gaming-related topics.
    const gamingKeywords = ['game', 'gaming', 'player', 'play', 'score', 'idle', 'clicker', 'virtual', 'online', 'trò chơi', 'chơi', 'game thủ', 'điểm', 'ảo', 'trực tuyến'];
    const questionLower = input.question.toLowerCase();
    const isRelated = gamingKeywords.some(keyword => questionLower.includes(keyword));
    return isRelated;
  }
);

const curatePhilosophicalQuestionPrompt = ai.definePrompt({
  name: 'curatePhilosophicalQuestionPrompt',
  input: {schema: CuratePhilosophicalQuestionInputSchema},
  output: {schema: CuratePhilosophicalQuestionOutputSchema},
  tools: [questionFilterTool],
  system: `Bạn là một trợ lý AI được thiết kế để tuyển chọn các câu hỏi triết học liên quan đến hành vi chơi game.
  Mục tiêu chính của bạn là đảm bảo rằng các câu hỏi khơi gợi sự suy ngẫm về sự tương tác của người chơi với trò chơi.
  Sử dụng questionFilterTool để kiểm tra xem câu hỏi có liên quan đến game không. Nếu có, chỉ cần lặp lại nó, nếu không, hãy trả về lỗi.`,
  prompt: `Đây là câu hỏi để tuyển chọn: {{{question}}}`,
});

const curatePhilosophicalQuestionFlow = ai.defineFlow(
  {
    name: 'curatePhilosophicalQuestionFlow',
    inputSchema: CuratePhilosophicalQuestionInputSchema,
    outputSchema: CuratePhilosophicalQuestionOutputSchema,
  },
  async input => {
    const {output} = await curatePhilosophicalQuestionPrompt(input);
    return output!;
  }
);
