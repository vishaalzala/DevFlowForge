#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {aggregate,markdown} from './core.mjs';
const args=process.argv.slice(2); const arg=(k)=>{let i=args.indexOf(k);return i<0?null:args[i+1]};
const qa=arg('--qa'),design=arg('--design'),output=arg('--out');
if((!qa&&!design)||!output){console.error('Usage: node src/cli.mjs [--qa qa-report.json] [--design design-report.json] --out /safe/path/report');process.exit(2)}
try{
 const read=async f=>f?JSON.parse(await fs.readFile(path.resolve(f),'utf8')):null;
 const report=aggregate(await read(qa),await read(design));const dest=path.resolve(output);
 await fs.mkdir(path.dirname(dest),{recursive:true,mode:0o700});
 await fs.writeFile(dest+'.json',JSON.stringify(report,null,2)+'\n',{mode:0o600});
 await fs.writeFile(dest+'.md',markdown(report),{mode:0o600});
 console.log(`Consolidated QA report: ${dest}.json and ${dest}.md`);
}catch(e){console.error(`QA report failed: ${e.message}`);process.exitCode=1}
