"use client";

import { useEffect, useState, useRef } from "react";
import React from "react";
import { OutcomeButtonProps } from "./Outcome";

export const OutcomeButton = React.memo(
  ({ odds, isActive, onClick }: OutcomeButtonProps) => {
    const [animationClass, setAnimationClass] = useState("");
    const prevOddsRef = useRef(odds);

    console.log("RENDER! OUTCOMEBUTTON");

    useEffect(() => {
      if (prevOddsRef.current !== odds) {
        const isHigher = odds > prevOddsRef.current;
        setAnimationClass(isHigher ? "animate-flashGreen" : "animate-flashRed");

        const timer = setTimeout(() => setAnimationClass(""), 1000);
        prevOddsRef.current = odds;

        return () => clearTimeout(timer);
      }
    }, [odds]);

    return (
      <button
        onClick={onClick}
        className={`
        w-16 h-10 rounded flex flex-col items-center justify-center font-bold transition-all border relative overflow-hidden active:scale-95
        ${
          isActive
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-blue-50 text-blue-900 border-transparent hover:bg-blue-100"
        }
      `}
      >
        <div
          className={`absolute inset-0 ${animationClass} pointer-events-none`}
        />

        <span className="relative z-10 text-xs">{odds.toFixed(2)}</span>

        {animationClass.includes("Green") && (
          <span className="absolute top-0.5 right-1 text-[8px] text-green-600">
            ▲
          </span>
        )}
        {animationClass.includes("Red") && (
          <span className="absolute bottom-0.5 right-1 text-[8px] text-red-600">
            ▼
          </span>
        )}
      </button>
    );
  },
);
