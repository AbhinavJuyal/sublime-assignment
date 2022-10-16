type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Options = Record<string, string>;

type ComponentData = {
  category: string;
  question: string;
  options: Options;
  required?: boolean;
};

type AllComponentData = Record<string, ComponentData>;

interface IModal {
  open: boolean;
  id: string;
}

interface IForm {
  componentData: AllComponentData;
  modal: IModal;
  formTitle: string;
  formDesc: string;
  formId: string;
}

interface DefaultFunctions {
  changeOptionText: (e: React.ChangeEvent, id: string) => void;
  changeTitle: React.ChangeEventHandler<HTMLInputElement>;
  removeOption: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

interface ISetComponentHOC extends DefaultFunctions {
  category: string;
  data: ComponentData;
  id: string;
}

interface IComponent extends DefaultFunctions {
  data: ISetComponentHOC.data;
  id: ISetComponentHOC.id;
  edit: boolean;
  editOptions: boolean;
  compId?: string;
}

interface IComponentTitle {
  data: ComponentData;
  edit: boolean;
  changeTitle: IComponent["changeTitle"];
}

interface IComponentOption {
  id: string;
  option: any;
  idx: number;
  edit: boolean;
  uniqueId?: string;
  compId?: string;
  changeOptionText: IComponent["changeOptionText"];
  removeOption: IComponent["removeOption"];
}
