import { Request, Response } from "express";
import { prisma } from "@/lib/db";
import { useIsoFormat } from "@/lib/helpers";

export const bannerGet = async (req: Request, res: Response) => {
  try {
    const currentDate = useIsoFormat(Date.now());
    //
    const banner = await prisma.banner.findFirst({
      where: {
        start_time: { lte: currentDate },
        end_time: { gte: currentDate },
      },
    });
    if (!banner) {
      return res.status(200).json({
        success: true,
        message: "no banner for today",
      });
    }
    //
    return res.status(200).json({
      success: true,
      message: "Successfully fetched banner",
      banner,
    });
    //
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export const bannerGetbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //
    const banner = await prisma.banner.findUnique({
      where: { id },
    });
    if (!banner) {
      return res
        .json({
          success: true,
          message: "no banner for today",
        })
        .status(200);
    }
    //
    return res
      .json({
        success: true,
        message: "Successfully fetched banner by id",
        banner,
      })
      .status(200);
    //
  } catch (e: any) {
    return res
      .json({
        success: false,
        message: e.message,
      })
      .status(400);
  }
};

export const bannerGetAll = async (req: Request, res: Response) => {
  try {
    const banners = await prisma.banner.findMany();
    if (!banners) {
      return res
        .json({
          success: true,
          message: "no banners found",
        })
        .status(200);
    }
    //
    return res
      .json({
        success: true,
        message: "Successfully fetched banner by id",
        banners,
      })
      .status(200);
    //
  } catch (e: any) {
    return res
      .json({
        success: false,
        message: e.message,
      })
      .status(400);
  }
};
