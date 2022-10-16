import { nanoid } from "nanoid";
import { XCircle } from "phosphor-react";

import EditOptions from "./EditOptions";

const ComponentTitle = ({ data, edit, changeTitle }: IComponentTitle) => {
  return (
    <>
      {edit ? (
        <input
          type="text"
          value={data.question}
          onChange={changeTitle}
          placeholder="Your Question Here"
          className="default-input mb-4"
        />
      ) : (
        <div className="question text-primary text-xl font-medium mb-2">
          {data.question}
        </div>
      )}
    </>
  );
};

const ComponentOption = ({
  id,
  option,
  idx,
  edit,
  uniqueId,
  changeOptionText,
  removeOption,
  compId,
}: IComponentOption) => {
  return (
    <>
      {edit ? (
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            className="default-checkbox w-4 aspect-square mb-1"
            name={`radio-${uniqueId}`}
          />
          <input
            type="text"
            required
            value={option}
            placeholder={`Option ${idx + 1}`}
            onChange={(e) => changeOptionText(e, id)}
            className="default-input max-w-[240px] m-0 placeholder:font-medium font-normal"
          />
          <button className="btn" onClick={(e) => removeOption(e, id)}>
            <XCircle size={22} weight="fill" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <input
            id={id}
            type="radio"
            className="default-checkbox"
            name={uniqueId}
            data-compid={compId}
            value={option}
          />
          <label htmlFor={id} className="text-base">
            {option}
          </label>
        </div>
      )}
    </>
  );
};

const Radio = (props: IComponent) => {
  const {
    id,
    data,
    edit = false,
    editOptions = false,
    changeOptionText,
    changeTitle,
    removeOption,
    compId,
  } = props;

  const uniqueId = nanoid().split("-")[0];

  return (
    <div className="default-shadow create-form-padding w-full h-fit bg-white py-6 rounded-lg ">
      <ComponentTitle {...{ data, edit, changeTitle }} />
      <div className="options-list flex flex-col gap-2">
        {Object.entries(data.options).map(([key, option], idx) => (
          <ComponentOption
            key={key}
            {...{
              id: key,
              option,
              idx,
              edit,
              changeOptionText,
              removeOption,
              uniqueId,
              compId,
            }}
          />
        ))}
      </div>
      {editOptions && <EditOptions id={id} />}
    </div>
  );
};

export default Radio;
