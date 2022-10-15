import EditOptions from "./EditOptions";

const CheckBox = ({
  id,
  data,
  edit = true,
  editOptions = true,
}: IComponentProps) => {
  return (
    <div className="default-shadow create-form-padding w-full h-fit bg-white py-6 rounded-lg ">
      <div className="question text-primary text-xl font-medium mb-2">
        {data.question}
      </div>
      <div className="options-list flex flex-col gap-2">
        {Object.entries(data.options).map(([key, option]) => (
          <div key={key} className="flex gap-2 items-center">
            <input id={key} type="checkbox" className="default-checkbox" />
            <label htmlFor={key} className="text-base">
              {option}
            </label>
          </div>
        ))}
      </div>
      {/* Edit Options */}
      {edit && <EditOptions id={id} />}
    </div>
  );
};

export default CheckBox;
