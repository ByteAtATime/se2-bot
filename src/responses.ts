import rawResponses from "./responses.yml";
import { z } from "zod";

const rawResponseSchema = z.object({
  keywords: z.array(z.string()),
  response: z.string(),
});

const parsedResponses = rawResponseSchema.array().parse(rawResponses);

export const responses = parsedResponses.reduce(
  (acc, { keywords, response }) => {
    keywords.forEach((keyword) => {
      acc[keyword] = response;
    });

    return acc;
  },
  {} as Record<string, string>,
);
