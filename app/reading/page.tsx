"use client";
import { useState } from "react";
import tarotCards from "@/public/cards.json";
import { interpretSpread, getCardInterpretation } from "../utils/tarotReadingLogic";

type TarotCard = {
  name: string;
  image: string;
  meaning_up: string;
  meaning_rev: string;
};

type SpreadType = "single" | "three" | "celtic";

const SPREAD_POSITIONS = {
  three: ["Past", "Present", "Future"],
  celtic: [
    "Present",
    "Challenge",
    "Past",
    "Future",
    "Above",
    "Below",
    "Advice",
    "External",
    "Hopes/Fears",
    "Outcome"
  ]
};

const Reading = () => {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [spreadType, setSpreadType] = useState<SpreadType>("single");
  const [showInterpretation, setShowInterpretation] = useState(false);

  const getRandomCards = (count: number) => {
    const shuffled = [...tarotCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({
        ...card,
        isReversed: Math.random() > 0.5
      }));
    setSelectedCards(shuffled.slice(0, count));
    setShowInterpretation(true);
  };

  const handleSpreadSelect = (spread: SpreadType) => {
    setSpreadType(spread);
    switch (spread) {
      case "single":
        getRandomCards(1);
        break;
      case "three":
        getRandomCards(3);
        break;
      case "celtic":
        getRandomCards(10);
        break;
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-semibold mb-4">Tarot Reading</h1>
      
      <div className="space-x-4 mb-8">
        <button
          onClick={() => handleSpreadSelect("single")}
          className={`px-4 py-2 rounded-lg ${
            spreadType === "single" ? "bg-purple-600" : "bg-purple-400"
          } text-white`}
        >
          Single Card
        </button>
        <button
          onClick={() => handleSpreadSelect("three")}
          className={`px-4 py-2 rounded-lg ${
            spreadType === "three" ? "bg-purple-600" : "bg-purple-400"
          } text-white`}
        >
          Three Card Spread
        </button>
        <button
          onClick={() => handleSpreadSelect("celtic")}
          className={`px-4 py-2 rounded-lg ${
            spreadType === "celtic" ? "bg-purple-600" : "bg-purple-400"
          } text-white`}
        >
          Celtic Cross
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {selectedCards.map((card, index) => {
          const positions = interpretSpread(selectedCards, spreadType);
          const position = positions[index]?.position || "General";
          
          return (
            <div key={index} className="text-center">
              <div className="relative">
                <img
                  src={card.image}
                  alt={card.name}
                  className={`w-48 h-72 mx-auto mb-4 rounded-lg shadow-lg transition-transform duration-500 ${
                    card.isReversed ? 'rotate-180' : ''
                  }`}
                />
                <div className="absolute top-0 left-0 bg-purple-600 text-white px-2 py-1 rounded-tl-lg">
                  {position}
                </div>
              </div>
              <h2 className="text-lg font-bold">{card.name}</h2>
              {showInterpretation && (
                <div className="mt-2 text-sm">
                  <p className="text-gray-700">
                    {getCardInterpretation(card, card.isReversed, position)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reading;
