# **App Name**: Philosopher's Click

## Core Features:

- Idle Point Accumulation: Implement an idle counter in Typescript that continuously increments.
- Philosophical Question Generator: Every 10 minutes, the app uses the Gemini API to generate a philosophical question that challenges the player's engagement.
- User Response Mechanism: Require the player to input an answer to the philosophical question to prevent the game from resetting. Allow at least 60 seconds to respond to a prompt, otherwise treat the silence as a negative response.
- Game Reset Condition: Reset the game if the player fails to answer the philosophical question, clearing all accumulated progress.
- Curated Question Selection: Employ a tool that filters Gemini API responses, guaranteeing the questions presented provoke contemplation on gaming behavior.

## Style Guidelines:

- Primary color: HSL 45, 100%, 50% (RGB: #FFB800) to represent enlightenment and focus, inspired by philosophical pursuit.
- Background color: HSL 45, 20%, 95% (RGB: #F5F3EB), providing a clean and unobtrusive backdrop that highlights the primary elements without distracting from the text.
- Accent color: HSL 75, 60%, 40% (RGB: #5E9C2E), offers contrast for interactive elements and calls to action, related to mental concentration.
- Body and headline font: 'Inter', a grotesque-style sans-serif, to convey neutrality and objectivity.
- Use minimalist icons to represent game functions, ensuring they do not overwhelm the philosophical theme. Use icons representing knowledge.
- Employ a clean and straightforward layout to minimize distractions and maintain focus on both the accumulating score and the philosophical questions presented.
- Subtle animations should accompany the increase in points and the arrival of new philosophical questions to gently guide the user.