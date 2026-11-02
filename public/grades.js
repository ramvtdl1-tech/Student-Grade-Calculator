// Illustrative 10-point letter-to-point mapping for fictional examples.
// No mark/percentage cutoffs are assumed from a letter grade.
export const SCALE = [['AA',10],['AB',9],['BB',8],['BC',7],['CC',6],['CD',5],['DD',4],['F',0]];
export function grade(letter) {
  const normalized=String(letter??'').trim().toUpperCase();
  const match=SCALE.find(([key])=>key===normalized);
  if(!match)throw Error('Select a final letter grade: AA, AB, BB, BC, CC, CD, DD or F. Pending grades cannot be used to calculate SPI.');
  return {letter:match[0],points:match[1]};
}
export function calculate(courses) {
  if(!Array.isArray(courses)||!courses.length||courses.length>100)throw Error('Enter between 1 and 100 subjects.');
  const rows=courses.map(c=>{
    if(!String(c.name??'').trim())throw Error('Every subject needs a name.');
    const credits=Number(c.credits);
    if(c.credits===''||c.credits==null||!Number.isFinite(credits)||credits<=0||credits>60)throw Error('Credit hours must be greater than zero and at most 60.');
    const converted=grade(c.letter);
    return {...c,credits,...converted,earned:converted.points>0?credits:0};
  });
  const credits=rows.reduce((sum,c)=>sum+c.credits,0);
  const earned=rows.reduce((sum,c)=>sum+c.earned,0);
  const weightedPoints=rows.reduce((sum,c)=>sum+c.credits*c.points,0);
  return {rows,credits,earned,weightedPoints,spi:weightedPoints/credits,passed:rows.every(c=>c.letter!=='F')};
}
