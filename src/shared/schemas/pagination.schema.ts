import { z } from "zod";

export const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => {
      const num = Number(v);
      return num > 0 ? num : 1;
    }),
  limit: z
    .string()
    .optional()
    .transform((v) => {
      const num = Number(v);
      return num > 0 && num <= 100 ? num : 10;
    }),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
