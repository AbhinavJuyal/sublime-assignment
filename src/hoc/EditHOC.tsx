import EditCheckBox from "@/components/EditCheckBox";
import EditRadio from "@/components/EditRadio";
import EditText from "@/components/EditText";
import {
  editComponent,
  newComponent,
  openModal,
  resetModal,
} from "@/redux/createFormSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CHECKBOX, RADIO, TEXT } from "@/utils/constants";
import { useState } from "react";
import { v4 } from "uuid";

const defState = {
  question: "",
  options: {
    [v4()]: "",
  },
};

const EditHOC = ({ category, id, data }: IEditHOC) => {
  const initialState = data ? data : defState;
  const [title, setTitle] = useState<string>(initialState.question);
  const [options, setOptions] = useState<Options>(initialState.options);
  const [values, setValues] = useState<boolean[]>(
    new Array(Object.keys(options).length).fill(false)
  );
  const dispatch = useAppDispatch();

  const addOption = () => {
    setOptions((prev: Options) => {
      return { ...prev, [v4()]: "" };
    });
  };

  const removeOption: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const key = (e.currentTarget as HTMLButtonElement).dataset.key;
    setOptions((prev) => {
      const temp = { ...prev };
      delete temp[key as string];
      return temp;
    });
  };

  const changeOptionText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = String((e.currentTarget as HTMLInputElement).dataset.key);
    setOptions((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const changeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const changeRadio = (idx: number) => {
    setValues((prev) => {
      const temp = [...prev].fill(false);
      temp[idx] = true;
      return temp;
    });
  };

  const submitModal = (data: Component) => {
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

  const baseProps = {
    title,
    options,
    values,
    addOption,
    removeOption,
    changeOptionText,
    changeTitle,
    changeRadio,
    save,
  };

  const EditTypes: Record<string, (props: IEditProps) => JSX.Element> = {
    [TEXT]: EditText,
    [CHECKBOX]: EditCheckBox,
    [RADIO]: EditRadio,
  };

  const Edit = EditTypes[category];

  return <Edit {...baseProps} />;
};

export default EditHOC;
