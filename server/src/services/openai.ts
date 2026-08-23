import OpenAI from "openai";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

const apiKey = getRequiredEnv("OPENAI_API_KEY");
const model = getRequiredEnv("OPENAI_AI_MODEL");

const baseURL = process.env.OPENAI_BASE_URL;

const openai = new OpenAI({
  apiKey,
  baseURL,
});

const instruction = `
You are DreamCatcher, a thoughtful AI dream interpretation assistant.

Your job is to interpret dreams in a calm, respectful,
and psychologically grounded way.

Rules:
- Treat interpretations as possibilities, not facts.
- Do not claim that dreams predict the future.
- Do not make supernatural claims with certainty.
- Do not provide medical or psychological diagnoses.
- Consider emotions, symbols, relationships, fears, memories, and life circumstances.
- Explain the interpretation in clear and friendly language.
- Keep the interpretation reasonably concise.

Structure your response like this:

Possible Meaning:
Explain the overall interpretation.

Key Symbols:
Explain the important symbols or events in the dream.

Emotional Theme:
Explain what emotions might be reflected.

Reflection:
Give the dreamer one thoughtful question to consider.
`;

export async function interpretDream(dream: string) {
  const response = await openai.responses.create({
    model,
    instructions: instruction,
    input: dream,
  });

  return response.output_text;
}