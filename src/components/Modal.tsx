import { categories, CHECKBOX, RADIO, TEXT } from "@/utils/constants";
import { useState } from "react";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DropDown from "./DropDown";
import {
  allComponentsSelector,
  modalSelector,
  newComponent,
  openModal,
  resetModal,
} from "@/redux/createFormSlice";
import EditHOC from "@/hoc/EditHOC";

const fetchData = (allData: ComponentData, id: string) => {
  console.log("key", id);
  return id === "" ? undefined : allData[id];
};

const Modal = () => {
  const { id, open } = useAppSelector(modalSelector);
  const editData = fetchData(useAppSelector(allComponentsSelector), id);
  console.log(typeof editData);
  const [category, setCategory] = useState<string>(
    editData ? editData.category : categories[0]
  );

  const dispatch = useAppDispatch();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const editHOCProps = {
    category,
    id,
    data: editData,
  };

  return (
    <div
      onClick={() => dispatch(openModal(false))}
      className={`${
        open ? "visibile" : "invisible"
      } absolute top-0 bottom-0 left-0 right-0 z-10 bg-black bg-opacity-20 flex items-center justify-center`}
    >
      <div
        onClick={handleClick}
        className="w-full min-h-fit max-w-md bg-white mx-2 px-6 py-8"
      >
        <div className="flex flex-col gap-8">
          <div className="flex justify-center items-center gap-2">
            <div className="text-primary font-bold text-xl whitespace-nowrap mr-12">
              {editData ? "Edit Field" : "Add Field"}
            </div>
            <DropDown
              options={categories}
              value={category}
              setValue={setCategory}
            />
          </div>
          <div className="type">
            <EditHOC {...editHOCProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
