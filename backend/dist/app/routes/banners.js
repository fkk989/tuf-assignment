"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerRouter = void 0;
const express_1 = require("express");
const banner_1 = require("../handlers/banner");
exports.bannerRouter = (0, express_1.Router)();
exports.bannerRouter.get("/", banner_1.bannerGet);
//
exports.bannerRouter.get("/all", banner_1.bannerGetAll);
//
exports.bannerRouter.get("/:id", banner_1.bannerGetbyId);
//
exports.bannerRouter.post("/", banner_1.bannerPost);
//
exports.bannerRouter.put("/:id", banner_1.bannerPut);
//
exports.bannerRouter.delete("/:id", banner_1.bannerDelete);
