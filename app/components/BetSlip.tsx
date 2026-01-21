import { BetItem } from "./BetItem";
import { BetSelection } from "../interfaces";
import { useBet } from "../provider/BetProvider";
import { useCallback, useState } from "react";

// THIS SHOULD BE OPTIMALIZED ASWELL ! !
// useBet rerenders it
export const BetSlip = ({ selections }: { selections: BetSelection[] }) => {
  const [stake, setStake] = useState(10);
  const { clearSlip, removeBet } = useBet();

  const removeBetCallback = useCallback((id: string) => removeBet(id), []);

  const totalOdds = selections.reduce((acc, curr) => acc * curr.odds, 1);
  const potentialWin = totalOdds * stake;

  const changeStake = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" || e.target.value === "NaN" ? "0" : e.target.value;

    setStake(parseFloat(value));
  };

  return (
    <div className="w-[350px] bg-gray-100 rounded-lg shadow-lg flex flex-col h-fit overflow-hidden border border-gray-200">
      <div className="bg-[#1a144d] text-white p-4 flex justify-between items-center">
        <h2 className="uppercase font-bold tracking-wider">
          Kupon <span className="text-yellow-400">({selections.length})</span>
        </h2>
        <button
          onClick={() => clearSlip()}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      <div className="max-h-[500px] overflow-y-auto bg-white">
        {selections.map((bet) => (
          <BetItem key={bet.id} selection={bet} removeBet={removeBetCallback} />
        ))}
      </div>
      <div className="flex text-[10px] font-bold uppercase text-gray-400 bg-white border-t border-gray-100">
        <button className="flex-1 py-3 border-b-2 border-transparent">
          Prosty
        </button>
        <button className="flex-1 py-3 border-b-2 border-blue-900 text-blue-900 bg-blue-50/50">
          Akumulator
        </button>
        <button className="flex-1 py-3 border-b-2 border-transparent">
          Systemowy
        </button>
      </div>
      <div className="p-4 space-y-3 bg-white border-t border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Stawka</span>
          <div className="relative">
            <input
              type="number"
              defaultValue={stake}
              onChange={changeStake}
              className="w-24 text-right pr-10 py-1 font-bold border-b border-gray-300 focus:outline-none focus:border-blue-900"
            />
            <span className="absolute right-0 top-1 text-gray-400 text-xs">
              EUR
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Kurs całkowity</span>
          <span className="font-bold bg-blue-900 text-white px-2 py-0.5 rounded text-xs">
            {totalOdds.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-2">
          <span className="text-gray-600 font-medium">Możliwa wygrana</span>
          <span className="font-black text-gray-900">
            €{potentialWin.toFixed(2)}
          </span>
        </div>

        <button className="w-full bg-[#1a144d] hover:bg-blue-800 text-white font-bold py-3 rounded-full transition-all active:scale-95 uppercase text-sm tracking-widest mt-2">
          Postaw zakład
        </button>
      </div>
    </div>
  );
};
