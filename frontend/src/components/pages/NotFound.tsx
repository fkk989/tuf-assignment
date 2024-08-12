import { useNavigate } from "react-router-dom";
import { Layout } from "../Layout";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="w-screen h-screen flex justify-center items-center text-black">
        <div className="flex flex-col gap-[10px] text-center">
          <h1 className="text-[50px]">Page not found</h1>
          <div
            onClick={() => {
              navigate("/");
            }}
            className="text-[20px] text-cyan-700 hover:text-cyan-500 cursor-pointer"
          >
            Go to home {">>"}
          </div>
        </div>
      </div>
    </Layout>
  );
};
