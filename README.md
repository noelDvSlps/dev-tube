1. npm init
2. install express and dot env
3. install dev nodemon
4. create scripts - see scripts
5. create a file server.js
6. install morgan for middleware
7. connect to mongoose npm i mongoose

## upload photo

1. npm i express-fileupload
2. make a controller
3. make a route
4. on main js declare
   const fileupload = require("express-fileupload");
   app.use(fileupload());
   const path = require("path");
   app.use(express.static(path.join(\_\_dirname, "public")));
5. on config.env add
   FILE_UPLOAD_PATH = ./public/uploads
   MAX_FILE_SIZE=1000000
6.
