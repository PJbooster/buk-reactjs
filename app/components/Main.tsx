"use client";

import { useState } from "react";
import { BetSlip } from "./BetSlip";
import { BettingList } from "./BettingList";
import { useBet } from "../provider/BetProvider";

export default function Main() {
  const [isMobileSlipOpen, setIsMobileSlipOpen] = useState(false);
  const { selectedBets, events } = useBet();

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto flex items-start bg-white shadow-2xl min-h-screen relative">
        <section className="w-full lg:w-2/3">
          <div className="p-4 lg:p-6 lg:pr-1">
            <BettingList data={events} />
          </div>
        </section>

        <aside
          className={`
            ${isMobileSlipOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0"}
            fixed inset-0 z-50 transition-transform duration-300 ease-in-out bg-white
            lg:relative lg:inset-auto lg:z-0 lg:w-1/3 lg:h-screen lg:sticky lg:top-0 lg:flex lg:flex-col lg:pt-6
          `}
        >
          <button
            onClick={() => setIsMobileSlipOpen(false)}
            className="lg:hidden absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full"
          >
            ✕
          </button>

          <div className="h-full overflow-y-auto pt-12 lg:pt-0">
            <BetSlip selections={selectedBets} />
          </div>
        </aside>

        {!isMobileSlipOpen && (
          <button
            onClick={() => setIsMobileSlipOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#1a144d] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce"
          >
            <span className="font-bold">KUPON</span>
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-sm">
              {selectedBets.length}
            </span>
          </button>
        )}
      </div>

      {isMobileSlipOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSlipOpen(false)}
        />
      )}
    </div>
  );
}
