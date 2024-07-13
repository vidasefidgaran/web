import { create } from "zustand";

interface sidebarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSidebarStore = create<sidebarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSidebarStore;
