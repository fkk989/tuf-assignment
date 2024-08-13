"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsoFormat = void 0;
const useIsoFormat = (timestamp) => {
    const date = new Date(timestamp); // Converts the timestamp to a Date object
    const isoString = date.toISOString(); // Converts the date to ISO 8601 format (UTC)
    console.log(isoString);
    return isoString;
};
exports.useIsoFormat = useIsoFormat;
