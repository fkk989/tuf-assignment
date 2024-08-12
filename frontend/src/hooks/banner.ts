import axios from "axios";
import { useEffect, useState } from "react";
import { FormData } from "../components/form";
import toast from "react-hot-toast";

export const useGetAllBanner = () => {
  const [banners, setBanners] = useState<FormData[] | null>(null);
  //   refetch function
  const refetch = async () => {
    const data = (await axios.get("/api/v1/banner/all")).data as {
      banners: FormData[];
    };
    if (data.banners) setBanners(data.banners);
  };
  //
  useEffect(() => {
    const fetchBanner = async () => {
      const data = (await axios.get("/api/v1/banner/all")).data as {
        banners: FormData[];
      };
      if (data.banners) setBanners(data.banners);
    };
    fetchBanner();
  }, []);
  return { banners, refetch };
};

export const useGetTodaysBanner = () => {
  const [banner, setBanner] = useState<FormData | null>(null);
  useEffect(() => {
    const fetchTodayBanner = async () => {
      const data = (await axios.get("/api/v1/banner")).data as {
        banner: FormData;
      };

      if (data.banner) setBanner(data.banner);
    };
    fetchTodayBanner();
  }, []);
  return { banner };
};

export const useAddBanner = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const mutate = async (data: Partial<FormData>) => {
    const res = await axios.post("/api/v1/banner", data);
    console.log(res);
    if (res.statusText === "OK") {
      setIsSuccess(true);
      toast.success("added successfully", { id: "add-banner" });
    } else {
      toast.error("Error adding banner", { id: "add-banner" });
    }
  };
  return { mutate, isSuccess };
};

export const useUpdateBanner = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const mutate = async ({
    data,
    id,
  }: {
    data: Partial<FormData>;
    id: string;
  }) => {
    toast.loading("wait", { id: "add-banner" });
    const res = await axios.put(`/api/v1/banner/${id}`, data);
    console.log(res);
    if (res.statusText === "OK") {
      setIsSuccess(true);
      toast.success("updated successfully", { id: "add-banner" });
    } else {
      toast.error("Error adding banner", { id: "add-banner" });
    }
  };
  return { mutate, isSuccess };
};

export const useDeleteBanner = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const mutate = async (data: { id: string }) => {
    const res = await axios.delete(`/api/v1/banner/${data.id}`);
    console.log(res);
    if (res.statusText === "OK") {
      setIsSuccess(true);
      toast.success("added successfully", { id: "add-banner" });
    } else {
      toast.error("Error adding banner", { id: "add-banner" });
    }
  };
  return { mutate, isSuccess };
};
