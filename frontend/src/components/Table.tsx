import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BannerForm, FormData } from "./form";
import { ModalComp } from "./modal";
import { useEffect, useState } from "react";
import { useDeleteBanner, useGetTodaysBanner, useUpdateBanner } from "../hooks";
import toast from "react-hot-toast";
import Switch from "@mui/material/Switch";
interface TableProp {
  data: FormData[] | null;
}
export const Table: React.FC<TableProp> = (prop) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate: updateMutation, isSuccess: updateSuccess } =
    useUpdateBanner();
  const { mutate: deleteMutation, isSuccess: deleteSuccess } =
    useDeleteBanner();

  const { banner } = useGetTodaysBanner();

  useEffect(() => {
    if (deleteSuccess || updateSuccess) {
      window.location.reload();
    }
  }, [deleteSuccess, updateSuccess]);
  return (
    <div className="overflow-x-auto ml-[50px] mt-[30px] custom-shadow">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Start Date</th>
            <th className="py-3 px-4">End Date</th>
            <th className="py-3 px-4">Action</th>
            <th className="py-3 px-4">Visiblity</th>
            <th className="py-3 px-4">Current Banner</th>
          </tr>
        </thead>
        <tbody>
          {prop.data &&
            prop.data.map(
              ({ id, description, start_time, end_time, link, is_visible }) => {
                const startDate = new Date(start_time);
                const endDate = new Date(end_time);
                return (
                  <tr
                    key={id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{description}</td>
                    <td className="py-3 px-4">{startDate.toUTCString()}</td>
                    <td className="py-3 px-4">{endDate.toUTCString()}</td>
                    <td className="py-3 px-4">
                      <div className=" flex items-center gap-[30px]">
                        {/* update modal  */}
                        <ModalComp
                          open={openUpdateModal}
                          setOpen={setOpenUpdateModal}
                          triggerComponent={
                            <MdEditSquare className="text-[25px] text-green-600 hover:text-green-900 cursor-pointer" />
                          }
                          component={
                            <BannerForm
                              title="Update Banner"
                              description={description}
                              is_visible={is_visible}
                              link={link}
                              start_time={startDate}
                              end_time={endDate}
                              onSubmit={(data) => {
                                const description = data.description;
                                const link = data.link;
                                const start_time = data.start_time as Date;
                                const end_time = data.end_time as Date;
                                const is_visible = data.is_visible;
                                //
                                if (end_time < start_time) {
                                  return toast.error(
                                    "end date should be after start date"
                                  );
                                }
                                updateMutation({
                                  data: {
                                    description,
                                    link,
                                    start_time: start_time.toISOString(),
                                    end_time: end_time.toISOString(),
                                    is_visible,
                                  },
                                  id,
                                });
                              }}
                            />
                          }
                        />
                        {/* delete modal */}
                        <ModalComp
                          open={openDeleteModal}
                          setOpen={setOpenDeleteModal}
                          triggerComponent={
                            <MdDelete className="text-[25px] text-[tomato] hover:text-red-600  cursor-pointer" />
                          }
                          component={
                            <div className="w-[500px] h-[250px] flex flex-col justify-center items-center gap-[30px] bg-black rounded-lg">
                              <h2 className="text-white text-[20px] font-bold">
                                Are you soure?
                              </h2>
                              <div className="flex gap-[20px] items-center">
                                <button
                                  onClick={() => {
                                    deleteMutation({ id });
                                  }}
                                  className="w-[150px] h-[40px] bg-[tomato] hover:bg-red-600 text-white rounded-lg"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => {
                                    setOpenDeleteModal(false);
                                  }}
                                  className="w-[150px] h-[40px] bg-green-600 hover:bg-green-900 text-white rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center ">
                        <Switch
                          id="visiblity"
                          checked={is_visible}
                          onClick={() => {
                            updateMutation({
                              data: {
                                description,
                                link,
                                start_time,
                                end_time,
                                is_visible: !is_visible,
                              },
                              id,
                            });
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        <label htmlFor="visiblity">Visiblity</label>
                      </div>
                    </td>
                    <td>{banner?.id === id && "this is the current banner"}</td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};
