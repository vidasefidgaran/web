import { create } from "zustand";

interface TreeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  setData: (data: any) => void;
}

const useTreeModal = create<TreeModalStore>((set) => ({
  isOpen: false,
  data: null,
  setData: (newData: any) => {
    set((state) => ({ data: { ...state.data, ...newData } }));
  },
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTreeModal;
