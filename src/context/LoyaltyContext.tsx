import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMyLoyalty } from '../services/loyalty';
import { getToken } from '../services/auth';

interface LoyaltyContextValue {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  canRedeem: (cost: number) => boolean;
  deductPoints: (cost: number) => void;
}

const DEFAULT_POINTS = 1003560;

const LoyaltyContext = createContext<LoyaltyContextValue | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(DEFAULT_POINTS);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setPoints(DEFAULT_POINTS);
      return;
    }
    (async () => {
      try {
        const loyalty = await getMyLoyalty();
        if (typeof loyalty.totalPoints === 'number') setPoints(loyalty.totalPoints);
        else setPoints(DEFAULT_POINTS);
      } catch {
        setPoints(DEFAULT_POINTS);
      }
    })();
  }, []);

  const canRedeem = (cost: number) => points >= cost;
  const deductPoints = (cost: number) => setPoints(prev => Math.max(prev - cost, 0));

  const value = useMemo(() => ({ points, setPoints, canRedeem, deductPoints }), [points]);

  return (
    <LoyaltyContext.Provider value={value}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export function useLoyalty(): LoyaltyContextValue {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error('useLoyalty debe usarse dentro de un LoyaltyProvider');
  return ctx;
}


