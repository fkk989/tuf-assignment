import { Layout } from "../Layout";
import { BannerForm } from "../form";
import { ModalComp } from "../modal/Modal";
import { useAddBanner, useGetAllBanner } from "../../hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "../Table";
//
export const Home = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { banners, refetch } = useGetAllBanner();
  const { mutate, isSuccess } = useAddBanner();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      window.location.reload();
      setOpenAddModal(false);
    }
  }, [isSuccess]);
  return (
    <Layout>
      <div className="w-screen h-screen flex flex-col  text-black">
        <div className="w-[70%]">
          <Table data={banners} />
        </div>

        {/* add modal  */}
        <ModalComp
          open={openAddModal}
          setOpen={setOpenAddModal}
          triggerComponent={
            <div className=" fixed top-[110px] right-0 flex justify-end items-center">
              <div className="w-[300px] h-[50px] flex items-center justify-center bg-slate-600 hover:bg-slate-500 text-white text-[18px] font-[500] mr-[20px] mt-[20px] rounded-md">
                ADD +
              </div>
            </div>
          }
          component={
            <BannerForm
              title="Add Banner"
              onSubmit={(data) => {
                const description = data.description;
                const link = data.link;
                const start_time = data.start_time as Date;
                const end_time = data.end_time as Date;
                const is_visible = data.is_visible;
                //
                if (end_time < start_time) {
                  return toast.error("end date should be after start date");
                }
                mutate({
                  description,
                  link,
                  start_time: start_time.toISOString(),
                  end_time: end_time.toISOString(),
                  is_visible,
                });
              }}
            />
          }
        />
      </div>
    </Layout>
  );
};
