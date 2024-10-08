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
exports.bannerDelete = void 0;
const db_1 = require("@/lib/db");
const bannerDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //
        const banner = yield db_1.prisma.banner.delete({
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
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
});
exports.bannerDelete = bannerDelete;
