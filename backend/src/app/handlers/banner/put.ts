import { Request, Response } from "express";
import { prisma } from "@/lib/db";
import { bannerSchema } from "@/lib/types";

export const bannerPut = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;
    //
    const parsedInput = await bannerSchema.safeParse(reqBody);
    if (!parsedInput.success) {
      return res.status(403).json({
        success: false,
        message: parsedInput.error.formErrors,
      });
    }
    //
    const { description, link, start_time, end_time, is_visible } =
      parsedInput.data;

    await prisma.banner.update({
      where: { id },
      data: {
        description,
        link,
        start_time,
        end_time,
        is_visible,
      },
    });
    //
    return res.status(200).json({
      success: true,
      message: "banner updated successfully",
    });
    //
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
