import { z } from "zod";

export const goalSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  thrustArea: z.enum(["Innovation", "Operational Excellence", "Customer Success", "Team Development"], {
    errorMap: () => ({ message: "Please select a valid thrust area" })
  }),
  weightage: z.number().min(5, "Weightage must be at least 5%").max(100, "Weightage cannot exceed 100%"),
  targetDate: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Target date must be in the future",
  }),
  metrics: z.string().min(5, "Please define clear success metrics"),
});
