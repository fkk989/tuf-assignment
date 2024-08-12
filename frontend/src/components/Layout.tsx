import React from "react";
import { Navbar } from "./Navbar";
import { useGetTodaysBanner } from "../hooks";
import Countdown from "./Countdown";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { banner } = useGetTodaysBanner();
  return (
    <div className="relative">
      {banner && banner.is_visible && (
        <div className="w-screen h-[50px] flex justify-evenly items-center bg-slate-500 overflow-hidden">
          <div className="text-white text-[20px] font-bold">
            {banner && banner.description}
          </div>
          <Countdown timeStampe={banner.end_time} />
          <a
            href={banner.link}
            target="_blank"
            className="w-[150px] h-[30px] flex items-center justify-center bg-[#1DA1F1] hover:bg-[#1da0f1dc] text-white text-[20px] rounded-md"
          >
            Get now
          </a>
        </div>
      )}
      <Navbar />
      {children}
    </div>
  );
};
