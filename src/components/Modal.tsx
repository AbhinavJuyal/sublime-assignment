import { categories, TEXT } from "@/utils/constants";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DropDown from "./DropDown";
import {
  allComponentsSelector,
  editComponent,
  modalSelector,
  newComponent,
  openModal,
  resetModal,
} from "@/redux/formSlice";
import ComponentHOC from "@/hoc/ComponentHOC";

const fetchData = (allData: AllComponentData, id: string) => {
  return id === "" ? undefined : allData[id];
};

const Modal = () => {
  const defState = {
    question: "",
    category: "",
    options: {
      [nanoid()]: "",
    },
  };
  const { id, open } = useAppSelector(modalSelector);
  const editData = fetchData(useAppSelector(allComponentsSelector), id);
  const initialState = editData ? editData : defState;

  const [title, setTitle] = useState<string>(initialState.question);
  const [options, setOptions] = useState<Options>(initialState.options);
  const [category, setCategory] = useState<string>(
    editData ? editData.category : categories[0]
  );

  useEffect(() => {
    return () => {
      dispatch(resetModal());
    };
  }, []);

  const dispatch = useAppDispatch();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const addOption = () => {
    setOptions((prev: Options) => {
      return { ...prev, [nanoid()]: "" };
    });
  };

  const removeOption = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setOptions((prev: Options) => {
      const temp = { ...prev };
      delete temp[id];
      return temp;
    });
  };

  const changeOptionText = (e: React.ChangeEvent, id: string) => {
    console.log("here");

    setOptions((prev: Options) => ({
      ...prev,
      [id]: (e.target as HTMLInputElement).value,
    }));
  };

  const changeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const submitModal = (data: ComponentData) => {
    id === ""
      ? dispatch(newComponent(data))
      : dispatch(editComponent({ ...data, id }));
    dispatch(openModal(false));
    dispatch(resetModal());
  };

  const save = () => {
    const optionsFilled = Object.values(options).every((val) => val !== "");
    console.log(optionsFilled);
    if (
      category !== TEXT &&
      (Object.keys(options).length === 0 || title === "" || !optionsFilled)
    ) {
      return;
    }
    if (category === TEXT && title === "") {
      return;
    }
    submitModal({ category, question: title, options: options });
  };

  const transfer = { question: title, category, options: options };

  const componentHOCProps = {
    category,
    id,
    data: transfer,
    edit: true,
    removeOption,
    changeOptionText,
    changeTitle,
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
        <div className="flex flex-col gap-8 mb-4">
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
            <ComponentHOC {...componentHOCProps} />
          </div>
        </div>
        {category !== TEXT && (
          <button
            onClick={addOption}
            type="button"
            className="block ml-auto mb-6 font-semibold rounded-lg"
          >
            Add Option
          </button>
        )}
        <button
          onClick={() => save()}
          type="button"
          className="w-full h-11 bg-primary text-white font-medium text-sm rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
