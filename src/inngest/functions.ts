import { inngest } from "./client";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generative-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "",
        prompt: "",
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generative-text",
      generateText,
      {
        model: openai("gpt-3.5-turbo"),
        system: "",
        prompt: "",
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generative-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-0"),
        system: "",
        prompt: "",
      }
    );
    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  }
);
