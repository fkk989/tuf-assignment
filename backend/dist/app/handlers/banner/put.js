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
exports.bannerPut = void 0;
const db_1 = require("@/lib/db");
const types_1 = require("@/lib/types");
const bannerPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reqBody = req.body;
        //
        const parsedInput = yield types_1.bannerSchema.safeParse(reqBody);
        if (!parsedInput.success) {
            return res.status(403).json({
                success: false,
                message: parsedInput.error.formErrors,
            });
        }
        //
        const { description, link, start_time, end_time, is_visible } = parsedInput.data;
        yield db_1.prisma.banner.update({
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
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
});
exports.bannerPut = bannerPut;
