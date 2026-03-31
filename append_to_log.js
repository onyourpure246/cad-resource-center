const fs = require('fs');
let content = fs.readFileSync('middleware.ts', 'utf8');
content = content.replace(
  'console.log("\\n--- INCOMING REQUEST ---");',
  'require("fs").appendFileSync("test.log", "\\n--- INCOMING REQUEST ---\\nPathname: " + req.nextUrl.pathname + "\\nURL: " + req.url + "\\n");'
);
content = content.replace('console.log("Pathname: ", req.nextUrl.pathname);', '');
content = content.replace('console.log("URL: ", req.url);', '');
fs.writeFileSync('middleware.ts', content);
