import { useEffect, useState } from "react";
import { ModalComp } from "./Modal";
import { MdDelete } from "react-icons/md";
import { useDeleteBanner } from "../../hooks";

const DeleteModal = ({ id }: { id: string }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate: deleteMutation, isSuccess: deleteSuccess } =
    useDeleteBanner();

  useEffect(() => {
    if (deleteSuccess) window.location.reload();
  }, [deleteSuccess]);

  return (
    <ModalComp
      open={openDeleteModal}
      setOpen={setOpenDeleteModal}
      triggerComponent={
        <MdDelete className="text-[25px] text-[tomato] hover:text-red-600  cursor-pointer" />
      }
      component={
        <div className="w-[500px] h-[250px] flex flex-col justify-center items-center gap-[30px] bg-black rounded-lg">
          <h2 className="text-white text-[20px] font-bold">Are you soure?</h2>
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
  );
};

export default DeleteModal;
