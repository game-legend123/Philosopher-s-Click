// src/ai/flows/generate-philosophical-question.ts
'use server';
/**
 * @fileOverview A philosophical question generator AI agent.
 *
 * - generatePhilosophicalQuestion - A function that generates a philosophical question about gaming.
 * - GeneratePhilosophicalQuestionInput - The input type for the generatePhilosophicalQuestion function.
 * - GeneratePhilosophicalQuestionOutput - The return type for the generatePhilosophicalQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePhilosophicalQuestionInputSchema = z.object({
  gameName: z.string().describe('The name of the game.'),
});
export type GeneratePhilosophicalQuestionInput = z.infer<typeof GeneratePhilosophicalQuestionInputSchema>;

const GeneratePhilosophicalQuestionOutputSchema = z.object({
  question: z.string().describe('Một câu hỏi triết học về bản chất của trò chơi và tác động của nó đối với cuộc sống.'),
});
export type GeneratePhilosophicalQuestionOutput = z.infer<typeof GeneratePhilosophicalQuestionOutputSchema>;

export async function generatePhilosophicalQuestion(input: GeneratePhilosophicalQuestionInput): Promise<GeneratePhilosophicalQuestionOutput> {
  return generatePhilosophicalQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'philosophicalQuestionPrompt',
  input: {schema: GeneratePhilosophicalQuestionInputSchema},
  output: {schema: GeneratePhilosophicalQuestionOutputSchema},
  prompt: `Là một AI triết học, hãy tạo ra một câu hỏi sâu sắc bằng tiếng Việt về trò chơi, phù hợp với trò chơi "{{{gameName}}}". Câu hỏi nên thách thức quan điểm của người chơi về sự tương tác của họ với trò chơi và những hàm ý rộng lớn hơn của nó.

Câu hỏi ví dụ: "Nếu điểm trong {{{gameName}}} không còn tồn tại, bạn có còn chơi không?"

Câu hỏi: `,
});

const generatePhilosophicalQuestionFlow = ai.defineFlow(
  {
    name: 'generatePhilosophicalQuestionFlow',
    inputSchema: GeneratePhilosophicalQuestionInputSchema,
    outputSchema: GeneratePhilosophicalQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
