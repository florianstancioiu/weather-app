export const parseStringAsMath = (expression: string): number => {
  return Function(`'use strict'; return (${expression})`)();
};
