import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Abstract AI Interface
export interface AIPageGenerator {
  generatePageConfig(prompt: string): Promise<AIPageResponse>;
}

export interface AIPageResponse {
  theme: string;
  backgroundColor: string;
  blocks: {
    type: "profile" | "link" | "text" | "social" | "divider" | "newsletter";
    contentJson: Record<string, any>;
    styleJson: Record<string, any>;
  }[];
}

// Concrete Implementation using Vercel AI SDK
export class VercelAIGenerator implements AIPageGenerator {
  async generatePageConfig(prompt: string): Promise<AIPageResponse> {
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY missing, using mock AI generator.");
      return this.mockGenerate();
    }

    const { object } = await generateObject({
      // @ts-ignore - mismatch in AI SDK parameters
      model: openai("gpt-4-turbo"),
      system: "You are an expert website designer and copywriter. You build Link-in-Bio pages consisting of blocks. Generate a valid JSON page layout matching the user's prompt.",
      prompt: `User prompt: ${prompt}\nGenerate the page blocks.`,
      schema: z.object({
        theme: z.string(),
        backgroundColor: z.string(),
        blocks: z.array(z.object({
          type: z.enum(["profile", "link", "text", "social", "divider", "newsletter"]),
          contentJson: z.record(z.string(), z.any()),
          styleJson: z.record(z.string(), z.any()),
        }))
      })
    });

    return object;
  }

  private mockGenerate(): AIPageResponse {
    // Fallback for local testing without an API key
    return {
      theme: "dark",
      backgroundColor: "#0f172a",
      blocks: [
        {
          type: "profile",
          contentJson: { name: "AI Generated Profile", bio: "This page was built by AI!" },
          styleJson: { radius: "full", alignment: "center" }
        },
        {
          type: "link",
          contentJson: { title: "My Portfolio", url: "https://example.com" },
          styleJson: { buttonStyle: "rounded", background: "#ffffff", color: "#000000" }
        }
      ]
    };
  }
}

export const aiGenerator = new VercelAIGenerator();
