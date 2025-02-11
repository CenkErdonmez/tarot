type CardPosition = {
  position: string;
  meaning: string;
};

export const getSpreadPositionMeaning = (position: string): string => {
  const positionMeanings: { [key: string]: string } = {
    Past: "Events, influences, and patterns from your past that affect your question",
    Present: "Current situation and immediate influences",
    Future: "Potential outcomes and upcoming influences",
    Challenge: "Current obstacles and difficulties you're facing",
    Above: "Conscious thoughts and aspirations",
    Below: "Subconscious influences and hidden factors",
    Advice: "Guidance and suggested course of action",
    External: "External influences and other people's impact",
    "Hopes/Fears": "Your inner hopes and fears about the situation",
    Outcome: "Likely outcome if current trajectory continues"
  };

  return positionMeanings[position] || "General influence";
};

export const interpretSpread = (cards: any[], spreadType: string): CardPosition[] => {
  if (spreadType === "single") {
    return [{
      position: "Present",
      meaning: "Overall influence or answer to your question"
    }];
  }

  const positions = spreadType === "three" 
    ? ["Past", "Present", "Future"]
    : [
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
      ];

  return positions.map(position => ({
    position,
    meaning: getSpreadPositionMeaning(position)
  }));
};

export const getCardInterpretation = (card: any, isReversed: boolean, position: string): string => {
  const baseMeaning = isReversed ? card.meaning_rev : card.meaning_up;
  const positionMeaning = getSpreadPositionMeaning(position);
  
  return `In the position of ${position} (${positionMeaning}), ${card.name} ${
    isReversed ? "reversed" : "upright"
  } suggests: ${baseMeaning}`;
}; 