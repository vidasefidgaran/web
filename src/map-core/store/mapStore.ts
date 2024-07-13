import { create } from "zustand";

interface MapStore {
  center: number[] | null;
}

const useMapModal = create<MapStore>((set) => ({
  center: null,

  setCenter: (position: MapStore) => set((position) => position),
}));

export default useMapModal;
