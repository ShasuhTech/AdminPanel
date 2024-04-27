import React from "react";
import { LoaderIcon } from "react-hot-toast";

const CommonButton = ({ text, onclick, style, loading,children }) => {
  return <button onclick={onclick} disabled={loading} className="bg-[#ff0000] w-full p-3 text-center text-white rounded-md flex justify-center items-center gap-2">{children}</button>;
};

export default CommonButton;
