#!/usr/bin/env node
import fs from 'node:fs/promises';import path from 'node:path';import {evaluate,markdown} from './core.mjs';
const args=process.argv.slice(2);const opt=k=>{let i=args.indexOf(k);return i<0?null:args[i+1]};
if(!opt('--input')||!opt('--out')){console.error('Usage: node src/cli.mjs --input fixtures.json --out private/report');process.exit(2)}
try{const report=evaluate(JSON.parse(await fs.readFile(path.resolve(opt('--input')),'utf8')));let dir=path.resolve(opt('--out'));await fs.mkdir(path.dirname(dir),{recursive:true,mode:0o700});await fs.writeFile(dir+'.json',JSON.stringify(report,null,2)+'\n',{mode:0o600});await fs.writeFile(dir+'.md',markdown(report),{mode:0o600});console.log(`Wrote ${dir}.json and ${dir}.md`)}catch(e){console.error(e.message);process.exitCode=1}
