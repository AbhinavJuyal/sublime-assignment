import { TEXT } from "@/utils/constants";
import { useState } from "react";

const EditText = (props: IEditProps) => {
  const { title, changeTitle, save } = props;
  return (
    <div className="">
      <input
        required
        value={title}
        onChange={changeTitle}
        type="text"
        placeholder="Your Question Here"
        className="default-input placeholder:font-semibold font-semibold mb-10"
      />
      <button
        onClick={() => save()}
        type="button"
        className="w-full h-11 bg-primary text-white font-medium text-sm rounded-lg"
      >
        Save
      </button>
    </div>
  );
};

export default EditText;
