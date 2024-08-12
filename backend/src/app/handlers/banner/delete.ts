import { Request, Response } from "express";
import { prisma } from "@/lib/db";

export const bannerDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //
    const banner = await prisma.banner.delete({
      where: {
        id,
      },
    });
    if (!banner) {
      return res.status(200).json({
        success: true,
        message: "no banner found",
      });
    }
    //
    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
    //
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
