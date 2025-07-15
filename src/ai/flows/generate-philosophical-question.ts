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
  question: z.string().describe('A philosophical question about the nature of gaming and its impact on life.'),
});
export type GeneratePhilosophicalQuestionOutput = z.infer<typeof GeneratePhilosophicalQuestionOutputSchema>;

export async function generatePhilosophicalQuestion(input: GeneratePhilosophicalQuestionInput): Promise<GeneratePhilosophicalQuestionOutput> {
  return generatePhilosophicalQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'philosophicalQuestionPrompt',
  input: {schema: GeneratePhilosophicalQuestionInputSchema},
  output: {schema: GeneratePhilosophicalQuestionOutputSchema},
  prompt: `As a philosophical AI, generate a thought-provoking question about gaming, tailored to the game "{{{gameName}}}". The question should challenge the player's perspective on their engagement with the game and its broader implications.

Example Question: "If the points in {{{gameName}}} ceased to exist, would you still play?"

Question: `,
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
