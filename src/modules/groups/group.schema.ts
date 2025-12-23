import { z } from "zod";

const positiveInt = z
  .string()
  .transform((v) => parseInt(v, 10))
  .refine((v) => Number.isInteger(v) && v > 0, {
    message: "Must be a positive integer",
  });

export const removeUserParamsSchema = z.object({
  userId: positiveInt,
  groupId: positiveInt,
});

export type RemoveUserParams = z.infer<typeof removeUserParamsSchema>;
