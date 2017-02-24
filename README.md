   BUG TRACKER
=================

A simple bug tracker created to discover the MERN stack, inspired from Vasan tutorial: https://hashnode.com/post/react-tutorial-using-mern-stack-ciiyus9m700qqge53mer0isxz.

Tools and technologies used
---------------------------
+ The frontend uses React, React-router, and React-Bootstrap.
+ The backend uses Node, Express and Mongoose.
+ The tests uses Mocha framework with Chai, sinon and proxyquire libraries.
+ The bundler used is Webpack. In a dev environment, it can use hot reloading via nodemon and Webpack dev server (WDS). In that case, WDS is used as a proxy on port 8081 that redirects every calls to the Express backend (that listens on port 8080). React hot reloading is not used as it does not integrate well with React Router as of December 2016.

To run in Dev mode:
-------------------
1. Start unit tests: `npm run test`
2. Start Database: `npm run db`
3. Start Nodemon: `npm run nodemon`
4. Start Webpack dev server: `npm run dev-server`
5. Point your browser to http://localhost:8081

To run in Production mode:
--------------------------
1. Start unit tests: `npm run test`
2. Bundle frontend: `npm run bundle`
3. Start Database: `npm run db`
4. Start Node server: `npm run node`
5. Point your browser to http://localhost:8080
