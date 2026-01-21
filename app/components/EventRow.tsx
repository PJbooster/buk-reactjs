import React from "react";
import { BettingEvent, Outcome } from "../interfaces";
import { formatEventDate } from "../utils";
import { Outcome as OutcomeComponent } from "./Outcome";

interface EventRowProps {
  event: BettingEvent;
  handleSelectBet: (outcome: Outcome, event: BettingEvent) => void;
}

export const EventRow = React.memo(
  ({ event, handleSelectBet }: EventRowProps) => {
    const { timeStr, dateStr } = formatEventDate(event.eventStart);

    console.log("RENDER! EVENTROW");

    const mainGame = event.eventGames.find((g) => g.gameName === "1x2");
    const outcomes =
      mainGame?.outcomes.sort(
        (a, b) => a.outcomePosition - b.outcomePosition,
      ) || [];

    return (
      <div className="flex items-center bg-white border-b border-gray-100 hover:bg-blue-50 transition-colors p-3 text-sm">
        <div className="w-16 text-gray-500 text-xs">
          <div>{timeStr}</div>
          <div>{dateStr}</div>
        </div>

        <div className="flex-1 font-medium text-gray-800 px-4">
          {event.eventName.split(" - ").map((team, idx) => (
            <div key={idx}>{team}</div>
          ))}
        </div>

        <div className="flex gap-2 mr-4">
          {outcomes.map((outcome) => (
            <OutcomeComponent
              key={outcome.outcomeId}
              odds={outcome.outcomeOdds}
              outcomeId={outcome.outcomeId}
              onClick={() => handleSelectBet(outcome, event)}
              isActive={outcome.isActive}
            />
          ))}
        </div>

        <div className="w-10 text-gray-400 text-xs text-right cursor-pointer hover:text-blue-600">
          {event.gamesCount} +
        </div>
      </div>
    );
  },
);
