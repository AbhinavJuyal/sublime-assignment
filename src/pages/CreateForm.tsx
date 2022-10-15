import CheckBox from "@/components/CheckBox";
import Radio from "@/components/Radio";
import Text from "@/components/Text";
import {
  allComponentsSelector,
  openModal,
  modalSelector,
} from "@/redux/createFormSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CHECKBOX, RADIO, TEXT } from "@/utils/constants";
import Modal from "@components/Modal";
import { PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";

const fetchData = () => {
  const data = JSON.parse(window.localStorage.getItem("create") as string);
  return data;
};

const ShowTypes: Record<string, (props: any) => JSX.Element> = {
  [CHECKBOX]: CheckBox,
  [TEXT]: Text,
  [RADIO]: Radio,
};

const CreateForm = () => {
  const componentData = useAppSelector(allComponentsSelector);
  const { open } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDesc, setFormDesc] = useState<string>("");

  const handleOpen = () => {
    dispatch(openModal(true));
  };

  const changeFormText: React.ChangeEventHandler = (e) => {
    const el = e.target as HTMLInputElement;
    const type = el.dataset.type;
    if (type === "title") setFormTitle(el.value);
    if (type === "description") setFormDesc(el.value);
  };

  return (
    <>
      {open && <Modal />}
      <div className="w-full h-full flex justify-center">
        <div className="relative py-10">
          <div className="create-form-padding">
            <div className="form-title">
              <input
                required
                type="text"
                value={formTitle}
                onChange={changeFormText}
                placeholder="Add Title"
                className="default-input text-3xl font-semibold placeholder:text-3xl placeholder:font-semibold mb-8"
                data-type="title"
              />
            </div>
            <div className="form-description">
              <textarea
                required
                value={formDesc}
                onChange={changeFormText}
                placeholder="Add Description"
                className="default-input h-14 w-full placeholder:text-xl placeholder:font-medium"
                data-type="description"
              />
            </div>
          </div>
          <div>
            {Object.keys(componentData).length !== 0 &&
              Object.entries(componentData).map(
                ([key, comp]: [string, Component], index) => {
                  const Show = ShowTypes[comp.category];
                  return <Show key={key} id={key} data={comp} />;
                }
              )}
          </div>
          {/* add button mobile */}
          <div className="w-full fixed flex justify-center items-center bottom-0 left-0 right-0 mb-4">
            <button
              type="button"
              onClick={handleOpen}
              className="inline bg-white rounded-full p-2 shadow-[0_2px_20px_0_rgba(0,0,0,0.15)]"
            >
              <PlusCircle size={42} className="text-primary" weight="fill" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
