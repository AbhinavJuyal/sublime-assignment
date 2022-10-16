import EditOptions from "./EditOptions";

interface IComponentTitle {
  data: ComponentData;
  edit: boolean;
  changeTitle: IComponent["changeTitle"];
}

const ComponentTitle = ({ data, edit, changeTitle }: IComponentTitle) => {
  return (
    <>
      {edit ? (
        <input
          required
          value={data.question}
          onChange={changeTitle}
          type="text"
          placeholder="Your Question Here"
          className="default-input placeholder:font-semibold font-semibold mb-10"
        />
      ) : (
        <div className="question text-primary text-xl font-medium mb-2">
          {data.question}
        </div>
      )}
    </>
  );
};

const Text = (props: IComponent) => {
  const {
    id,
    data,
    edit = false,
    editOptions = false,
    changeTitle,
    compId,
  } = props;

  return (
    <div className="default-shadow create-form-padding w-full h-fit bg-white py-6 rounded-lg ">
      <ComponentTitle {...{ data, edit, changeTitle }} />
      {!edit && (
        <input
          type="text"
          className="default-input"
          placeholder="Your Answer Here"
          data-compid={compId}
        />
      )}
      {editOptions && <EditOptions id={id} />}
    </div>
  );
};

export default Text;
