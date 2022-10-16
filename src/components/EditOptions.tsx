import {
  changeModalData,
  deleteComponent,
  deleteForm,
  openModal,
} from "@/redux/formSlice";
import { useAppDispatch } from "@/redux/hooks";
import { PencilSimple, Trash } from "phosphor-react";
import { useNavigate } from "react-router-dom";

interface IEditOptions {
  id: string;
  type?: string;
}

const EditOptions = ({ id, type }: IEditOptions) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editComponent: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(id);
    if (type === "form") {
      navigate("/create", { state: { id } });
      return;
    }
    dispatch(openModal(true));
    dispatch(changeModalData(id));
  };

  const removeComponent: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (type === "form") {
      dispatch(deleteForm(id));
      return;
    }
    dispatch(deleteComponent(id));
  };

  return (
    <div className="w-full flex justify-end gap-4">
      <button type="button" onClick={editComponent}>
        <PencilSimple className="text-2xl" />
      </button>
      <button type="button" onClick={removeComponent}>
        <Trash className="text-2xl" />
      </button>
    </div>
  );
};

export default EditOptions;
