import { FloppyDiskBack, PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import CheckBox from "@/components/CheckBox";
import Radio from "@/components/Radio";
import Text from "@/components/Text";
import {
  allComponentsSelector,
  openModal,
  modalSelector,
  resetForm,
  loadForm,
  formSelector,
} from "@/redux/formSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CHECKBOX, RADIO, storageKey, TEXT } from "@/utils/constants";
import Modal from "@components/Modal";
import ComponentHOC from "@/hoc/ComponentHOC";

const fetchData = () => {
  const data = JSON.parse(window.localStorage.getItem(storageKey) as string);
  return data;
};

const FORM_TITLE = "form-title";
const FORM_DESC = "form-description";

const ShowTypes: Record<string, (props: any) => JSX.Element> = {
  [CHECKBOX]: CheckBox,
  [TEXT]: Text,
  [RADIO]: Radio,
};

const CreateForm = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(modalSelector);
  const componentData = useAppSelector(allComponentsSelector);
  const { title, desc, id: formId } = useAppSelector(formSelector);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formTitle, setFormTitle] = useState<string>(title);
  const [formDesc, setFormDesc] = useState<string>(desc);

  useEffect(() => {
    const id = state?.id;
    if (id) {
      const forms = fetchData();
      dispatch(loadForm({ data: forms[id], id }));
    }
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const handleOpen = () => {
    dispatch(openModal(true));
  };

  const changeFormText: React.ChangeEventHandler = (e) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === FORM_TITLE) setFormTitle(value);
    if (name === FORM_DESC) setFormDesc(value);
  };

  const handleCreateForm = () => {
    if (formTitle === "" || formDesc === "") {
      console.log("no save data");
      return;
    }
    const allForms = fetchData();
    window.localStorage.setItem(
      "form",
      JSON.stringify({
        ...allForms,
        [formId === "" ? nanoid() : formId]: {
          formTitle,
          formDesc,
          componentData,
        },
      })
    );
    toast.success("Form Created!");
    navigate("/");
  };

  return (
    <>
      {open && <Modal />}
      <div className="w-full h-full flex justify-center">
        <div className="relative">
          <div className="create-form-padding">
            <div className="form-title">
              <input
                required
                type="text"
                value={formTitle}
                onChange={changeFormText}
                placeholder="Add Title"
                className="default-input text-3xl font-semibold placeholder:text-3xl placeholder:font-semibold mb-8"
                name={FORM_TITLE}
              />
            </div>
            <div className="form-description">
              <textarea
                required
                value={formDesc}
                onChange={changeFormText}
                placeholder="Add Description"
                className="default-input h-14 w-full placeholder:text-xl placeholder:font-medium"
                name={FORM_DESC}
              />
            </div>
          </div>
          <div>
            {Object.keys(componentData).length !== 0 &&
              Object.entries(componentData).map(
                ([key, comp]: [string, ComponentData], index) => {
                  return (
                    <div className="mb-6" key={key}>
                      <ComponentHOC
                        category={comp.category}
                        id={key}
                        data={comp}
                        editOptions={true}
                      />
                    </div>
                  );
                }
              )}
          </div>
          {/* add button mobile */}
          <div className="w-full max-w-[700px] fixed flex justify-center items-center gap-4 bottom-0 left-0 right-0 mb-4 rounded-full p-2 shadow-[0_2px_20px_0_rgba(0,0,0,0.15)] mx-auto">
            <button type="button" onClick={handleOpen} className="inline">
              <PlusCircle size={32} className="text-primary" weight="fill" />
            </button>
            <button type="button" onClick={handleCreateForm} className="inline">
              <FloppyDiskBack
                size={32}
                className="text-primary"
                weight="fill"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
