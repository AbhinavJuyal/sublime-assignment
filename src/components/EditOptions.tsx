import {
  changeModalData,
  deleteComponent,
  openModal,
} from "@/redux/createFormSlice";
import { useAppDispatch } from "@/redux/hooks";
import { PencilSimple, Trash } from "phosphor-react";

interface IEditOptions {
  id: string;
}

const EditOptions = ({ id }: IEditOptions) => {
  const dispatch = useAppDispatch();

  const editComponent: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(openModal(true));
    dispatch(changeModalData(id));
  };

  const removeComponent: React.MouseEventHandler<HTMLButtonElement> = () => {
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
