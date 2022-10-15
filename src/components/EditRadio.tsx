import { RADIO } from "@/utils/constants";
import { XCircle } from "phosphor-react";
import { useState } from "react";
import { v4 } from "uuid";

const EditRadio = (props: IEditProps) => {
  const {
    title,
    options,
    addOption,
    removeOption,
    changeOptionText,
    changeTitle,
    save,
  } = props;

  const uniqueId = v4().split("-")[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-10">
        <input
          required
          type="text"
          value={title}
          onChange={changeTitle}
          placeholder="Your Question Here"
          className="default-input mb-4"
        />
        <div className="flex flex-col gap-4 max-h-72 overflow-y-auto">
          {Object.entries(options).map(([key, value], idx) => (
            <div key={idx} className="flex justify-between items-center gap-4">
              <input
                type="radio"
                name={`radio-${uniqueId}`}
                className="default-checkbox w-4 aspect-square mb-1"
              />
              <input
                type="text"
                required
                value={value}
                placeholder={`Option ${idx + 1}`}
                className="default-input max-w-[240px] m-0 placeholder:font-medium font-normal"
                data-key={key}
                onChange={changeOptionText}
              />
              <button className="btn" onClick={removeOption} data-key={key}>
                <XCircle size={22} weight="fill" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={addOption}
        type="button"
        className="block ml-auto mb-6 font-semibold rounded-lg"
      >
        Add Option
      </button>
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

export default EditRadio;
