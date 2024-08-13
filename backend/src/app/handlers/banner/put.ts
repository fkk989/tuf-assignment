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

    //before updaing check the date should not overlap with other banners
    const banner_present_with_overlap = await prisma.banner.findFirst({
      where: {
        NOT: { id },
        AND: [
          {
            start_time: {
              lte: start_time,
            },
            end_time: {
              gte: end_time,
            },
          },
        ],
      },
    });

    console.log(banner_present_with_overlap);
    if (banner_present_with_overlap) {
      return res.status(409).json({
        success: false,
        message: `please edit or delete banner overlaping the same dates`,
      });
    }

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
