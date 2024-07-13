import { create } from "zustand";

interface TreeEditModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useTreeEditModal = create<TreeEditModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useTreeEditModal;
