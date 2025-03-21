import { createContext, useContext, useState, ReactNode } from "react";
import { streakGoalDurationsMap } from "@/utils/utils";
import { StreakGoalDuration } from "@/interfaces/interfaces";

type StreakGoalContextType = {
  streakGoal: StreakGoalDuration;
  setStreakGoal: (streakGoal: StreakGoalDuration) => void;
};

const StreakGoalContext = createContext<StreakGoalContextType>({
  streakGoal: streakGoalDurationsMap[0],
  setStreakGoal: () => {},
});

export const StreakGoalProvider = ({ children }: { children: ReactNode }) => {
  const [streakGoal, setStreakGoal] = useState<StreakGoalDuration>(streakGoalDurationsMap[0]);

  return (
    <StreakGoalContext.Provider value={{ streakGoal, setStreakGoal }}>
      {children}
    </StreakGoalContext.Provider>
  );
};

export const useStreakGoal = () => useContext(StreakGoalContext);