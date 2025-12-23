import { z } from "zod";

export const paginationSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .optional()
      .transform((v) => Number(v) || 10),
    offset: z
      .string()
      .optional()
      .transform((v) => Number(v) || 0),
  }),
});
