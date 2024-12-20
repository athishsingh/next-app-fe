import { CreateLocationTimingProps } from "@/src/view/main/locations/components/add-location/location-info-component/location.types";
import { MemberDetailsPropsType } from "@/src/view/main/locations/components/add-location/members-component/members-info.types";
import { create } from "zustand";

interface AddLocationTypes {
  locationName: string;
  locationAddress: string;
  locationTimings: CreateLocationTimingProps[];
  sections: string[];
  selectedSections: string[];
  membersInfo: MemberDetailsPropsType[];
  setLocationName: (val: string) => void;
  setLocationAddress: (val: string) => void;
  setLocationTimings: (val: CreateLocationTimingProps[]) => void;
  setSections: (val: string[]) => void;
  setSelectedSections: (val: string[]) => void;
  addNewMember: () => void;
  updateMemberInfo: (val: MemberDetailsPropsType[]) => void;
}

export const useAddLocationStore = create<AddLocationTypes>((set, get) => ({
  locationAddress: "",
  locationName: "",
  locationTimings: [],
  sections: [],
  selectedSections: [],
  membersInfo: [],
  setLocationAddress: (val) => set({ locationAddress: val }),
  setLocationName: (val) => set({ locationName: val }),
  setLocationTimings: (val) => set({ locationTimings: val }),
  setSections: (val) => set({ sections: val }),
  setSelectedSections: (val) => set({ selectedSections: val }),
  addNewMember: () => {
    let arr = [...get().membersInfo];
    arr.push({
      locationId: "",
      memberName: "",
      phoneNumber: "",
    });
    set({ membersInfo: arr });
  },
  updateMemberInfo: (val) => set({ membersInfo: val }),
}));
