import { create } from "zustand";
interface AddressObject {
  BaseRegionId: string;
  BaseTreeTypeId: string;
  BasePlantTypeId: string;
  BasePlantNatureId: string;
  geometry: {};
  BaseTreeIrrigationTypeId: string;
  StreetId: string;
  TreeObjectID: string;
  Code: string;
  TreeDate: string;
  ShamsiTreeDate: string;
  X: string;
  Y: string;
  Status: string;
  isEnabled: string;
}
interface MapModalStore {
  key: string | undefined;
  info: AddressObject | null;
  setInfo: (data: AddressObject) => void;
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
}

const CodeStore = create<MapModalStore>((set) => ({
  key: undefined,
  info: null,
  setInfo: (data: AddressObject) => set({ info: data }),
  setIsLoading: (data: boolean) => set({ isLoading: data }),
  isLoading: true,
}));

export default CodeStore;
