import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculate,grade} from '../public/grades.js';
import {DEMO_RECORD} from '../public/academic-data.js';
const course=(letter,credits=3)=>({name:'Course',credits,letter});
test('fictional demo SPI matches the weighted grade points and credits',()=>{
 const r=calculate(DEMO_RECORD.courses);
 assert.equal(r.credits,16);assert.equal(r.earned,16);assert.equal(r.weightedPoints,133);
 assert.equal(r.spi,8.3125);assert.equal(r.spi.toFixed(2),'8.31');
 assert.equal(r.passed,true);assert.equal(r.rows.length,5);
});
test('illustrative grade conversion is case-insensitive',()=>{
 assert.equal(grade('AA').points,10);assert.equal(grade(' bb ').points,8);
});
test('unequal credits weight SPI and failures retain attempted credits',()=>{
 const r=calculate([course('AA',4),course('F',2)]);
 assert.equal(r.spi,40/6);assert.equal(r.credits,6);assert.equal(r.earned,4);assert.equal(r.passed,false);
});
test('rejects pending/unknown grades and invalid credits',()=>{
 for(const c of [course('I'),course('X'),course('A'),course(''),course('AA',0),course('AA',''),course('AA',Infinity),course('AA',61),{...course('AA'),name:' '}])assert.throws(()=>calculate([c]));
 assert.throws(()=>calculate([]));
});
test('does not invent marks or percentages from letters',()=>{
 const r=calculate(DEMO_RECORD.courses);
 for(const key of ['percentage','rawPercentage','obtained','max'])assert.equal(Object.hasOwn(r,key),false);
 for(const c of DEMO_RECORD.courses)for(const key of ['obtained','max','percent'])assert.equal(Object.hasOwn(c,key),false);
});
test('planning scenarios do not mutate the fictional example',()=>{
 const copy=structuredClone(DEMO_RECORD.courses);copy[0].letter='F';
 assert.equal(calculate(copy).earned,12);assert.equal(DEMO_RECORD.courses[0].letter,'AB');assert.equal(calculate(DEMO_RECORD.courses).earned,16);
});
