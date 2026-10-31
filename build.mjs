import {cpSync,mkdirSync} from 'node:fs';
mkdirSync('dist',{recursive:true});cpSync('public','dist',{recursive:true});console.log('Static deployment files: dist/');
