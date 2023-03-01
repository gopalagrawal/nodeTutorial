Enabling TypeScript
----------------------------
npm install -D typescript   // or use -g to install globally. 

In project folder:  tsc --init

Rename src/app.js & src/models/customer.js  to equiv *.ts
 - (Optionally) Place pragma on top of all *.ts:  // @ts-nocheck  
 - This allows smooth use of existing JS code in ts file. 

Compile code with :  tsc src/app.ts
    - transpiles to src/app.js

To transpile everything in project (-p): 
 - tsc -p tsconfig.json --watch
 - If you get bunch of errors, make sure the @ts-nocheck pragma in top of all *.ts files. 
 - The 'watch' option is like nodemon. 


To run the project:: 
- npm run start
- This will run the 'npx nodemon src/app.js' just as before. 
- Make sure current IP address is allowed to access online mongodb. 


