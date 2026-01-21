import { BettingEvent } from "@/app/interfaces";
import { useEffect } from "react";

export const useWSEmulator = (
  events: BettingEvent[],
  setEvents: React.Dispatch<React.SetStateAction<BettingEvent[]>>,
  intervalMs: number = 5000,
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((currentEvents) => {
        if (currentEvents.length === 0) return currentEvents;
        const randomIndex = Math.floor(Math.random() * currentEvents.length);
        const updatedEvents = [...currentEvents];
        const eventToUpdate = { ...updatedEvents[randomIndex] };

        eventToUpdate.eventGames = eventToUpdate.eventGames.map((game) => ({
          ...game,
          outcomes: game.outcomes.map((outcome) => {
            const change = Math.random() * 0.3 - 0.15;
            const newOdds = Math.max(1.05, outcome.outcomeOdds + change);

            return {
              ...outcome,
              outcomeOdds: parseFloat(newOdds.toFixed(2)),
            };
          }),
        }));

        updatedEvents[randomIndex] = eventToUpdate;
        return updatedEvents;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [setEvents, intervalMs]);
};
