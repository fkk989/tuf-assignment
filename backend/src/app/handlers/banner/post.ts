import { Request, Response } from "express";
import { prisma } from "@/lib/db";
import { bannerSchema } from "@/lib/types";

export const bannerPost = async (req: Request, res: Response) => {
  try {
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

    /*
       finding banner wiht same or future start date but
      its end time is before the end time of banner we are creating so we will not create the banner  
    */
    // end_time should be after start_time
    if (start_time >= end_time) {
      return res.status(400).json({
        success: false,
        message: "end Data should be after than start date",
      });
    }
    // banner present in the same date range
    const banner_present_with_overlap = await prisma.banner.findFirst({
      where: {
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

    await prisma.banner.create({
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
      message: "banner created successfully",
    });
    //
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
