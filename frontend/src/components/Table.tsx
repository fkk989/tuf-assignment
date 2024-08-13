import { FormData } from "./form";
import { useEffect } from "react";
import { useGetTodaysBanner, useUpdateBanner } from "../hooks";
import Switch from "@mui/material/Switch";
import UpdateModal from "./modal/UpdateModal";
import DeleteModal from "./modal/DeleteModal";
interface TableProp {
  data: FormData[] | null;
}
export const Table: React.FC<TableProp> = (prop) => {
  const { banner } = useGetTodaysBanner();

  const { mutate: updateMutation, isSuccess: updateSuccess } =
    useUpdateBanner();

  useEffect(() => {
    if (updateSuccess) window.location.reload();
  }, [updateSuccess]);

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
                      <div className=" flex items-center gap-[10px] justify-center">
                        {/* update modal  */}
                        <UpdateModal
                          {...{
                            id,
                            description,
                            start_time: startDate,
                            end_time: endDate,
                            link,
                            is_visible,
                          }}
                        />
                        {/* delete modal */}
                        <DeleteModal id={id} />
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
