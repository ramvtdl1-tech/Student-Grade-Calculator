// Illustrative standard scale from the Stitch calculator; adapt to your institution.
export const SCALE = [[90,'A',4],[85,'A-',3.7],[80,'B+',3.3],[75,'B',3],[70,'B-',2.7],[65,'C+',2.3],[60,'C',2],[55,'D+',1.3],[50,'D',1],[0,'F',0]];
export function grade(percent){if(!Number.isFinite(percent)||percent<0||percent>100)throw Error('Percentage must be between 0 and 100.');const [,letter,points]=SCALE.find(([min])=>percent>=min);return {letter,points};}
export function calculate(courses){
 if(!Array.isArray(courses)||!courses.length||courses.length>100)throw Error('Enter between 1 and 100 subjects.');
 const rows=courses.map(c=>{const credits=Number(c.credits),obtained=Number(c.obtained),max=Number(c.max);
 if(!String(c.name||'').trim())throw Error('Every subject needs a name.');
 if([c.credits,c.obtained,c.max].some(v=>v===''||v==null)||![credits,obtained,max].every(Number.isFinite)||credits<=0||credits>60||max<=0||max>1000000||obtained<0||obtained>max)throw Error('Use credits from 0–60 (above zero), positive maximum marks, and obtained marks between zero and the maximum.');
 const percent=obtained/max*100;return {...c,credits,obtained,max,percent,...grade(percent)};});
 const credits=rows.reduce((s,c)=>s+c.credits,0),obtained=rows.reduce((s,c)=>s+c.obtained,0),max=rows.reduce((s,c)=>s+c.max,0);
 const percentage=rows.reduce((s,c)=>s+c.percent*c.credits,0)/credits;
 return {rows,credits,obtained,max,percentage,rawPercentage:obtained/max*100,gpa:rows.reduce((s,c)=>s+c.points*c.credits,0)/credits,passed:rows.every(c=>c.letter!=='F')};
}
export function targetFinal(current,weight,target){[current,weight,target]=[current,weight,target].map(Number);if(![current,weight,target].every(Number.isFinite)||current<0||current>100||weight<=0||weight>100||target<0||target>100)throw Error('Enter percentages from 0–100; final weight must be above zero.');return (target-current*(1-weight/100))/(weight/100);}
