import { create } from "zustand";
interface AddressObject {
  id: string | undefined;
  BaseRegionId: string;
  BaseTreeTypeId: string;
  BasePlantTypeId: string;
  BasePlantNatureId: string;
  geometry: {};
  BaseRegionName: string;
  BaseTreeIrrigationTypeId: string;
  StreetId: string;
  TreeObjectID: string;
  Code: string;
  TreeDate: string;
  ShamsiTreeDate: string;
  X: string;
  Y: string;
  Status: string;
  StreetName: string;
  isEnabled: string;
  Address?: string;
  BaseTreeNatureName?: string;
  BaseTreeKindName?: string;
  Diameter?: string;
  Height?: string;
  BaseTreeIrrigationTypeName?: string;
  BaseTreeTypeName?: string;
}
interface MapModalStore {
  info: AddressObject | null;
  setInfo: (data: AddressObject) => void;
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
}

const CodeStore = create<MapModalStore>((set) => ({
  info: null,
  setInfo: (data: AddressObject) => set({ info: data }),
  setIsLoading: (data: boolean) => set({ isLoading: data }),
  isLoading: false,
}));

export default CodeStore;
