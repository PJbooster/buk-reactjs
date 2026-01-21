import { useCallback } from "react";
import { BettingEvent, Outcome } from "../interfaces";
import { formatEventDate } from "../utils";
import { EventRow } from "./EventRow";
import { useBet } from "../provider/BetProvider";

export const BettingList = ({ data }: { data: BettingEvent[] }) => {
  const { addBet } = useBet();

  const grouped = data.reduce(
    (acc, event) => {
      if (!acc[event.category3Name]) acc[event.category3Name] = [];
      acc[event.category3Name].push(event);
      return acc;
    },
    {} as Record<string, BettingEvent[]>,
  );

  const handleAddEvent = useCallback(
    (outcome: Outcome, event: BettingEvent) => {
      const { timeStr, dateStr } = formatEventDate(event.eventStart);

      addBet({
        id: outcome.outcomeId.toString(),
        eventId: event.eventId.toString(),
        matchName: event.eventName,
        selectionName: outcome.outcomeName,
        marketName: "1x2",
        odds: outcome.outcomeOdds,
        category: `${event.category1Name} - ${event.category2Name} - ${event.category3Name}`,
        startTime: `${timeStr} ${dateStr}`,
      });
    },
    [],
  );

  return (
    <div className="max-w-4xl w-full bg-gray-50 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-[#1a144d] text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 uppercase font-bold text-xs tracking-wider">
          <span className="bg-green-500 w-2 h-2 rounded-full"></span>
          Piłka nożna
        </div>
        <div className="flex gap-14 mr-[80px] text-[10px] text-gray-300">
          <span>1</span>
          <span>X</span>
          <span>2</span>
        </div>
      </div>

      {Object.entries(grouped).map(([league, events]) => (
        <div key={league}>
          <div className="bg-gray-100 p-2 text-xs font-bold text-gray-600 flex items-center gap-2 border-b border-gray-200">
            <span className="text-red-500 text-lg leading-none">+</span>
            {events[0].category2Name} - {league}
          </div>
          {events.map((event) => (
            <EventRow
              key={event.eventId}
              event={event}
              handleSelectBet={handleAddEvent}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
