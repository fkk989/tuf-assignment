"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerGetAll = exports.bannerGetbyId = exports.bannerGet = void 0;
const db_1 = require("@/lib/db");
const helpers_1 = require("@/lib/helpers");
const bannerGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = (0, helpers_1.useIsoFormat)(Date.now());
        //
        const banner = yield db_1.prisma.banner.findFirst({
            where: {
                OR: [
                    {
                        start_time: {
                            lte: currentDate,
                        },
                        end_time: {
                            gte: currentDate,
                        },
                    },
                ],
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
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
});
exports.bannerGet = bannerGet;
const bannerGetbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //
        const banner = yield db_1.prisma.banner.findUnique({
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
    }
    catch (e) {
        return res
            .json({
            success: false,
            message: e.message,
        })
            .status(400);
    }
});
exports.bannerGetbyId = bannerGetbyId;
const bannerGetAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banners = yield db_1.prisma.banner.findMany({
            orderBy: { start_time: "asc" },
        });
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
    }
    catch (e) {
        return res
            .json({
            success: false,
            message: e.message,
        })
            .status(400);
    }
});
exports.bannerGetAll = bannerGetAll;
