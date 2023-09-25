import { create } from "zustand";

interface PathStore {
    dynamicData?: [],

    setDynamicData: (Path: [] | any) => void;

}

const reportBuilderStore = create<PathStore>((set) => ({
    dynamicData: [],
    setDynamicData: (Path) => set(() => ({ dynamicData: Path })),
}));

export default reportBuilderStore;
