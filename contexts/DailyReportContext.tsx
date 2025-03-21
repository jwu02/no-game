import { DailyReport } from "@/db/models/DailyReport";
import { createContext, ReactNode, useContext, useState } from "react";

type DailyReportContextType = {
  dailyReport: DailyReport | null;
  setDailyReport: (dailyReport: DailyReport) => void;
};

const DailyReportContext = createContext<DailyReportContextType>({
  dailyReport: null,
  setDailyReport: () => {},
});

export const DailyReportProvider = ({ children }: { children: ReactNode }) => {
  const [dailyReport, setDailyReport] = useState<DailyReport | null>(null);

  return (
    <DailyReportContext.Provider value={{ dailyReport, setDailyReport }}>
      {children}
    </DailyReportContext.Provider>
  );
};

export const useDailyReport = () => useContext(DailyReportContext);