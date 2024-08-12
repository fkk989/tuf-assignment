import { Router } from "express";
import {
  bannerDelete,
  bannerGet,
  bannerGetAll,
  bannerGetbyId,
  bannerPost,
  bannerPut,
} from "../handlers/banner";

export const bannerRouter = Router();

bannerRouter.get("/", bannerGet);
//
bannerRouter.get("/all", bannerGetAll);
//
bannerRouter.get("/:id", bannerGetbyId);
//
bannerRouter.post("/", bannerPost);
//
bannerRouter.put("/:id", bannerPut);
//
bannerRouter.delete("/:id", bannerDelete);
