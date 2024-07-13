import { create } from "zustand";

type Data = {
  data: { [key: string]: string }[];
  dataForExcel: { [key: string]: string }[];
  inputSearchValue: string;
  setData: (newData: { [key: string]: string }[]) => void;
  setDataForExcel: (newData: { [key: string]: string }[]) => void;
  updateSearchValue: (inputSearchValue: string) => void;
};

const useTableSearch = create<Data>((set) => ({
  data: [],
  dataForExcel: [],
  inputSearchValue: "",
  setData: (newData) => set({ data: newData }),
  setDataForExcel: (newData) => set({ dataForExcel: newData }),
  updateSearchValue: (inputSearchValue) =>
    set(() => ({ inputSearchValue: inputSearchValue })),
}));

export default useTableSearch;
