"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerSchema = void 0;
const zod_1 = require("zod");
exports.bannerSchema = zod_1.z.object({
    description: zod_1.z.string(),
    link: zod_1.z.string(),
    start_time: zod_1.z.string().datetime(),
    end_time: zod_1.z.string().datetime(),
    is_visible: zod_1.z.boolean(),
});
