import { create } from "zustand";

const useMapStore = create((set) => ({
  olMap: null,
  populateMap: (mapGenerated) => set((state) => ({ olMap: mapGenerated })),
  removeMap: () => set({ olMap: null }),
}));

export default useMapStore;
