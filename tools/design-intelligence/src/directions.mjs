#!/usr/bin/env node
/** Original, deterministic conceptual prompts; not a prebuilt theme or AI design generator. */
import fs from 'node:fs/promises';
const ARCS=[
  {name:'Task-first workspace',composition:'Put the primary action and live task state first; keep other information in contextual side panels',rhythm:'Compact, high-clarity layout with dense but scannable operational detail',strength:'Fast completion of repeated work',risk:'May underplay brand storytelling'},
  {name:'Evidence-led narrative',composition:'Lead with the real product or process, show verified examples, then make the action obvious at each decision point',rhythm:'Alternating long-form explanation and purposeful large-scale demonstrations',strength:'Trust and comprehension for unfamiliar products',risk:'Can be slower for returning power users'},
  {name:'Focused guided journey',composition:'Turn the main job into a clear sequence with visible progress, relevant choices and transparent recovery states',rhythm:'One major decision per screen or section, with deliberate visual emphasis',strength:'Reduces decision effort for first-time users',risk:'Extra steps can hinder experienced users'},
];
export function proposeDirections(brief){
  for(const field of ['product','audience','primaryJob'])if(!String(brief?.[field]||'').trim())throw Error(`Brief requires ${field}`);
  return {product:brief.product,audience:brief.audience,primaryJob:brief.primaryJob,brand:brief.brand||'not supplied',facts:brief.material||[],constraints:brief.constraints||[],note:'Concepts are original starting points. Do not invent metrics, testimonials or images; preserve approved brand tokens.',directions:ARCS.map((a,i)=>({id:i+1,...a,firstScreen:`Show: ${brief.primaryJob}; use only verified content supplied for ${brief.product}.`,mobile:'Keep the primary action visible, preserve keyboard access, support narrow layouts and long/error/empty states',verification:'Compare against real user tasks, brand constraints, accessibility and implementation effort.'}))};
}
if(process.argv[1]?.endsWith('directions.mjs')){
  const i=process.argv.indexOf('--brief'),j=process.argv.indexOf('--out');
  if(i<0||!process.argv[i+1]){console.error('Usage: npm run directions -- --brief config/brief.json [--out directions.json]');process.exit(2)}
  const brief=JSON.parse(await fs.readFile(process.argv[i+1],'utf8'));
  const output=JSON.stringify(proposeDirections(brief),null,2)+'\n';
  if(j>=0&&process.argv[j+1]){await fs.writeFile(process.argv[j+1],output);console.log(`Saved ${process.argv[j+1]}`)}else process.stdout.write(output);
}
