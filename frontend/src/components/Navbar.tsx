import { Dropdown } from "./dropdowns";
import { LinkButton } from "./buttons";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="sticky top-0 bg-white">
        <div className="relative flex items-center w-screen h-[55px] border-b-[1px] border-[#dfddd2] px-[40px]">
          <h1
            className="w-[100px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            Hello Striver
          </h1>
          {/* nav links */}
          <div className="flex items-center w-full justify-between  px-[15px] gap-[7px]">
            <div className="flex items-center">
              <Dropdown
                title="Product"
                component={
                  <div className="absolute top-[55px] left-0 w-screen h-[400px] flex justify-center items-center bg-gray-400 shadow-lg text-white text-[20px]">
                    {" "}
                    Nothing here
                  </div>
                }
              />
              <Dropdown
                title="Solutions"
                component={
                  <div className="absolute top-[55px] left-0 w-screen h-[400px] flex justify-center items-center bg-gray-500 shadow-lg text-white text-[20px]">
                    {" "}
                    Nothing here
                  </div>
                }
              />
              <Dropdown
                title="Resources"
                component={
                  <div className="absolute top-[55px] left-0 w-screen h-[400px] flex justify-center items-center bg-gray-600 shadow-lg text-white text-[20px]">
                    {" "}
                    Nothing here
                  </div>
                }
              />
              <LinkButton title="Pricing" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
