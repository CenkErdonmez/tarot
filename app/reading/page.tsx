"use client";
import { useState } from "react";

import tarotCards from "@/public/cards.json";
const Reading = () => {
  const [randomCard, setRandomCard] = useState<any>(null); // Store random card data

  // Function to select a random card
  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    setRandomCard(tarotCards[randomIndex]);
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h1 className='text-xl font-semibold mb-4'>Tarot Reading</h1>
      <button
        onClick={getRandomCard}
        className='bg-blue-500 text-white px-4 py-2 rounded-lg mb-4'
      >
        Get a Random Card
      </button>

      {randomCard && (
        <div className='text-center'>
          <img
            src={randomCard.image}
            alt={randomCard.name}
            className='w-48 h-48 mx-auto mb-4'
          />
          <h2 className='text-lg font-bold'>{randomCard.name}</h2>
          <p className='italic'>Upright: {randomCard.meaning_up}</p>
          <p className='italic'>Reversed: {randomCard.meaning_rev}</p>
        </div>
      )}
    </div>
  );
};

export default Reading;
