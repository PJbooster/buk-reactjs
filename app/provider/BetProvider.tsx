"use client";
import { BetSelection, BettingEvent } from "@/app/interfaces";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useWSEmulator } from "../hooks/useWSEmulator";

interface BetContextType {
  selectedBets: BetSelection[];
  addBet: (bet: BetSelection) => void;
  removeBet: (id: string) => void;
  clearSlip: () => void;
  events: BettingEvent[];
}

const BetContext = createContext<BetContextType | undefined>(undefined);

export function BetProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: BettingEvent[];
}) {
  const [events, setEvents] = useState<BettingEvent[]>(data);
  const [selectedBets, setSelectedBets] = useState<BetSelection[]>([]);

  useWSEmulator(events, setEvents, 2000);

  useEffect(() => {
    // good enough?
    setSelectedBets((prevBets) =>
      prevBets.map((bet) => {
        const freshEvent = events.find(
          (e) => e.eventId.toString() === bet.eventId,
        );
        const freshOutcome = freshEvent?.eventGames[0]?.outcomes.find(
          (o) => o.outcomeId.toString() === bet.id,
        );

        if (freshOutcome && freshOutcome.outcomeOdds !== bet.odds) {
          return { ...bet, odds: freshOutcome.outcomeOdds };
        }
        return bet;
      }),
    );
  }, [events]);

  const addBet = (bet: BetSelection) => {
    setSelectedBets((prev) => {
      const isExactlySame = prev.find((b) => b.id === bet.id);
      if (isExactlySame) {
        return prev.filter((b) => b.id !== bet.id);
      }
      const otherBetFromSameEvent = prev.find(
        (b) => b.eventId === bet.eventId && b.marketName === bet.marketName,
      );

      if (otherBetFromSameEvent) {
        return [...prev.filter((b) => b.id !== otherBetFromSameEvent.id), bet];
      }

      return [...prev, bet];
    });
  };

  const removeBet = (id: string) => {
    setSelectedBets((prev) => prev.filter((bet) => bet.id !== id));
  };

  const clearSlip = () => setSelectedBets([]);

  return (
    <BetContext.Provider
      value={{ selectedBets, addBet, removeBet, clearSlip, events }}
    >
      {children}
    </BetContext.Provider>
  );
}

export const useBet = () => {
  const context = useContext(BetContext);
  if (!context) throw new Error("no provider!");
  return context;
};
