type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Options = Record<string, string>;

type Component = {
  category: string;
  question: string;
  options: Options;
  required?: boolean;
};

type ComponentData = Record<string, Component>;

interface IModal {
  open: boolean;
  id: string;
}

interface ICreateForm {
  saved: boolean;
  componentData: ComponentData;
  modal: IModal;
  formTitle: string;
  formDesc: string;
  readonly formId: string;
}

interface IEditHOC {
  id: string;
  data: Component | undefined;
  category: string;
}

interface IShowHOC extends IEditHOC {
  data: Component;
  edit?: boolean;
}

interface IEditProps {
  title: string;
  options: Options;
  values: boolean[];
  addOption: () => void;
  removeOption: React.MouseEventHandler<HTMLButtonElement>;
  changeOptionText: React.ChangeEventHandler<HTMLInputElement>;
  changeTitle: React.ChangeEventHandler<HTMLInputElement>;
  changeRadio: (idx: number) => void;
  save: () => void;
}

interface IComponentProps {
  id: string;
  data: Component;
  category: string;
  edit?: boolean;
  editOptions?: boolean;
}
