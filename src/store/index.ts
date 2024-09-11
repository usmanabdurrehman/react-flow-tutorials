import { create } from "zustand";

interface Mode {
  isDark: boolean;
  toggleMode: () => void;
}

export const useDarkMode = create<Mode>()((set) => ({
  isDark: false,
  toggleMode: () => set((state) => ({ isDark: !state.isDark })),
}));
