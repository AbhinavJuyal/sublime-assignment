import ComponentHOC from "@/hoc/ComponentHOC";
import { CHECKBOX } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface IFormData {
  componentData: AllComponentData;
  formTitle: string;
  formDesc: string;
}

const defFormData: IFormData = {
  componentData: {},
  formTitle: "",
  formDesc: "",
};

type FormState = Record<string, { question: string; value: string | string[] }>;
const defFormState: FormState = {};

const ShowForm = () => {
  const [formData, setFormData] = useState<IFormData>(defFormData);
  const [formState, setFormState] = useState<FormState>(defFormState);
  const { id } = useParams();
  const { formTitle, formDesc, componentData } = formData;

  useEffect(() => {
    const allForms = JSON.parse(window.localStorage.getItem("form") as string);
    const { componentData } = allForms[String(id)];
    const newFormState: FormState = {};
    Object.entries(componentData).forEach(
      ([key, comp]: [key: string, comp: any]) => {
        const category = comp.category as string;
        newFormState[key] = {
          question: comp.question,
          value: category === CHECKBOX ? [] : "",
        };
      }
    );
    setFormState(newFormState);
    setFormData(allForms[String(id)]);
  }, []);

  const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const parsed = Object.values(formState).map((comp) => ({
      question: comp.question,
      value: comp.value,
    }));
    console.log("Submitted Data", parsed);
    toast.success("Form submitted successfully. Check console for data");
  };

  const changeForm: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    const { value, dataset, type, checked } = e.target;
    const { compid } = dataset;
    if (!compid) return;

    setFormState((prev: any) => {
      const temp = { ...prev };
      if (type === "checkbox") {
        const prevVal = [...(temp[compid as string].value as string[])];
        const newVal = checked
          ? [...prevVal, value]
          : [...prevVal.filter((val) => val !== value)];
        temp[compid as string].value = newVal;
      }
      if (type === "radio") {
        temp[compid as string].value = value;
      }
      if (type === "text") {
        temp[compid as string].value = value;
      }
      return temp;
    });
  };

  return (
    <>
      {Object.keys(formData).length === 0 ? (
        <>Loading...</>
      ) : (
        <div className="w-full min-h-full flex flex-col">
          <div className="create-form-padding">
            <div className="form-title">
              <div className="default-input text-3xl font-semibold placeholder:text-3xl placeholder:font-semibold mb-8">
                {formTitle}
              </div>
            </div>
            <div className="form-description">
              <div className="default-input h-14 w-full placeholder:text-xl placeholder:font-medium">
                {formDesc}
              </div>
            </div>
          </div>
          <form
            onChange={changeForm}
            onSubmit={submitForm}
            className="create-form-padding flex flex-col min-h-full grow"
          >
            {Object.entries(componentData).map(([key, comp], idx) => (
              <div key={key} className="mb-6">
                <ComponentHOC data={comp} compId={key} />
              </div>
            ))}
            <button className="default-button mt-auto">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ShowForm;
