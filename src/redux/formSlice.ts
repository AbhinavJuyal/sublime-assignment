import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { nanoid } from "nanoid";
import { deleteStorage, fetchData } from "@/utils/constants";

const initialState: IForm = {
  componentData: {},
  modal: {
    open: false,
    id: "",
  },
  formTitle: "",
  formDesc: "",
  formId: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    loadForm: (state, action: PayloadAction<any>) => {
      const newState = action.payload.data;
      const id = action.payload.id;
      state.componentData = newState.componentData;
      state.modal = initialState.modal;
      state.formTitle = newState.formTitle;
      state.formDesc = newState.formDesc;
      state.formId = id;
    },
    deleteForm: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      deleteStorage(id);
    },
    newComponent: (state, action: PayloadAction<ComponentData>) => {
      const prev = state.componentData;
      state.componentData = { ...prev, [nanoid()]: action.payload };
    },
    editComponent: (
      state,
      action: PayloadAction<ComponentData & { id?: string }>
    ) => {
      const updatedData = { ...action.payload };
      delete updatedData.id;
      state.componentData[action.payload.id as string] = updatedData;
    },
    deleteComponent: (state, action: PayloadAction<string>) => {
      delete state.componentData[action.payload];
    },
    openModal: (state, action: PayloadAction<boolean>) => {
      state.modal.open = action.payload;
    },
    changeModalData: (state, action: PayloadAction<string>) => {
      state.modal.id = action.payload;
    },
    resetModal: (state) => {
      state.modal = initialState.modal;
    },
    resetForm: (state) => {
      state.componentData = initialState.componentData;
      state.modal = initialState.modal;
      state.formTitle = initialState.formTitle;
      state.formDesc = initialState.formDesc;
      state.formId = initialState.formId;
    },
  },
});

export const {
  newComponent,
  editComponent,
  deleteComponent,
  openModal,
  changeModalData,
  resetModal,
  resetForm,
  loadForm,
  deleteForm,
} = formSlice.actions;

export const allComponentsSelector = (state: RootState) =>
  state.form.componentData;

export const modalSelector = (state: RootState) => state.form.modal;

export const formSelector = (state: RootState) => ({
  title: state.form.formTitle,
  desc: state.form.formDesc,
  id: state.form.formId,
});

export default formSlice.reducer;
