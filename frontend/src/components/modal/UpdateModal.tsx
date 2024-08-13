import React, { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { ModalComp } from "./Modal";
import { BannerForm } from "../form";
import toast from "react-hot-toast";
import { useUpdateBanner } from "../../hooks";

interface UpdateModalProp {
  id: string;
  description: string;
  is_visible: boolean;
  link: string;
  start_time: Date;
  end_time: Date;
}

const UpdateModal: React.FC<UpdateModalProp> = (prop) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { mutate: updateMutation, isSuccess: updateSuccess } =
    useUpdateBanner();

  useEffect(() => {
    if (updateSuccess) {
      window.location.reload();
    }
  }, [updateSuccess]);
  return (
    <ModalComp
      open={openUpdateModal}
      setOpen={setOpenUpdateModal}
      triggerComponent={
        <MdEditSquare className="text-[25px] text-green-600 hover:text-green-900 cursor-pointer" />
      }
      component={
        <BannerForm
          title="Update Banner"
          description={prop.description}
          is_visible={prop.is_visible}
          link={prop.link}
          start_time={prop.start_time}
          end_time={prop.end_time}
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
            updateMutation({
              data: {
                description,
                link,
                start_time: start_time.toISOString(),
                end_time: end_time.toISOString(),
                is_visible,
              },
              id: prop.id,
            });
          }}
        />
      }
    />
  );
};

export default UpdateModal;
