import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { v4 } from "uuid";

const initialState: ICreateForm = {
  saved: false,
  componentData: {},
  modal: {
    open: false,
    id: "",
  },
  formTitle: "",
  formDesc: "",
  formId: v4(),
};

export const createFormSlice = createSlice({
  name: "createForm",
  initialState,
  reducers: {
    newComponent: (state, action: PayloadAction<Component>) => {
      const prev = state.componentData;
      state.componentData = { ...prev, [v4()]: action.payload };
    },
    editComponent: (
      state,
      action: PayloadAction<Component & { id?: string }>
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
  },
});

export const {
  newComponent,
  editComponent,
  deleteComponent,
  openModal,
  changeModalData,
  resetModal,
} = createFormSlice.actions;

export const allComponentsSelector = (state: RootState) =>
  state.createForm.componentData;

export const modalSelector = (state: RootState) => state.createForm.modal;

export default createFormSlice.reducer;
