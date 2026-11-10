#!/usr/bin/env node
import fs from 'node:fs/promises';
import {assessImpact} from './core.mjs';
const args=process.argv.slice(2), idx=args.indexOf('--input');
if(idx<0||!args[idx+1]||args.length!==2){console.error('Usage: node src/cli.mjs --input <approved-impact-map.json>');process.exit(2)}
try{
 const json=JSON.parse(await fs.readFile(args[idx+1],'utf8'));
 const result=assessImpact(json);
 console.log(JSON.stringify(result,null,2));
 process.exitCode=result.ready?0:1;
}catch(e){console.error('Impact manifest unavailable or invalid JSON:',e.message);process.exitCode=2}
