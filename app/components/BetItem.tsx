import React from "react";
import { BetSelection } from "../interfaces";

export const BetItem = React.memo(
  ({
    selection,
    removeBet,
  }: {
    selection: BetSelection;
    removeBet: (id: string) => void;
  }) => {
    console.log("RENDER! BETITEM");

    return (
      <div className="p-3 bg-white border-b border-gray-100 last:border-0 relative">
        <div className="flex justify-between items-start mb-1">
          <span className="font-bold text-gray-900 pr-8">
            {selection.selectionName}
          </span>
          <span className="bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[45px] text-center">
            {selection.odds.toFixed(2)}
          </span>
          <button
            onClick={() => removeBet(selection.id)}
            className="absolute right-2 top-3 text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="text-xs text-gray-500 space-y-0.5">
          <div className="font-medium text-gray-700">
            {selection.marketName}
          </div>
          <div>{selection.matchName}</div>
          <div className="flex justify-between">
            <span>{selection.category}</span>
            <span>{selection.startTime}</span>
          </div>
        </div>
      </div>
    );
  },
);
