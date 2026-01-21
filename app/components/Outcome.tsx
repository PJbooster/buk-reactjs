"use client";

import { useBet } from "../provider/BetProvider";
import { OutcomeButton } from "./OutcomeButton";

export interface OutcomeButtonProps {
  odds: number;
  onClick: () => void;
  outcomeId: number;
  isActive?: boolean;
}

export const Outcome = (props: OutcomeButtonProps) => {
  const { selectedBets } = useBet();
  const isActive = selectedBets.some(
    (bet) => bet.id === props.outcomeId.toString(),
  );

  return <OutcomeButton {...props} isActive={isActive} />;
};
