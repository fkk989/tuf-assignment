import { z } from "zod";
import { Banner } from "@prisma/client";

export const bannerSchema = z.object({
  description: z.string(),
  link: z.string(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  is_visible: z.boolean(),
});
