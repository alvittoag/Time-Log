import { create } from "zustand";

export type Ilog = {
  note: string;
  hour: number;
  date: Date | string;
};

interface LogState {
  log: Ilog;
  setLog: (log: Ilog) => void;
  setDate: (date: Date) => void;
  logs: {
    [key: string]: Ilog;
  };
  setLogs: (log: Ilog, key: string) => void;
}

export const useLogStore = create<LogState>((set) => ({
  log: {
    note: "",
    hour: 0,
    date: new Date(),
  },
  logs: {},
  setLog: (log: Ilog) => set((state) => ({ log: { ...state.log, ...log } })),
  setDate: (date: Date) => set((state) => ({ log: { ...state.log, date } })),
  setLogs: (log: Ilog, key: string) =>
    set((state) => {
      const updateLog = { ...state.logs, [key]: log };
      const sortedKeys = Object.keys(updateLog).sort();

      const sortedObject: { [key: string]: Ilog } = {};

      for (const key of sortedKeys) {
        sortedObject[key] = updateLog[key];
      }

      return { logs: sortedObject };
    }),
}));
