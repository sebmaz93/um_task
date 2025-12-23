import { z } from "zod";

export const removeUserParams = z.object({
  params: z.object({
    userId: z.string().transform(Number),
    groupId: z.string().transform(Number),
  }),
});
