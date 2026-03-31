const fs = require('fs');
let content = fs.readFileSync('middleware.ts', 'utf8');
content = `console.log('\\n--- INCOMING REQUEST ---');\nconsole.log('Pathname: ', req.nextUrl.pathname);\nconsole.log('URL: ', req.url);\nconsole.log('Headers: ', JSON.stringify(Object.fromEntries(req.headers.entries())));\n` + content;
content = content.replace('export default auth((req) => {', 'export default auth((req) => {\nconsole.log("\\n--- INCOMING REQUEST ---");\nconsole.log("Pathname: ", req.nextUrl.pathname);\nconsole.log("URL: ", req.url);\n');
fs.writeFileSync('middleware.ts', content);
