How to install and run:

1) Download NodeJS from the following website: https://nodejs.org/en/download/
2) Unzip domain-tool.zip into the directory of your choice
3) Open terminal and CD into the top level of the project directory "cd domain-tool"
4) Run "npm install" - (This will install dependencies for the backend)
5) CD in the public folder "cd public" (The front-end application is server from this folder)
6) Run "npm install" - (This will install dependencies for the front-end)
7) Run "Au Run" (This will compile the front end and get it ready to be loaded)
8) Press CTRL + C to cancel this once it is serving the front end
9) CD back into the top level directory "cd .." and run "npm start" (This will start and serve the application)

To run the application from again if the server is stopped, simply cd into the project directory and run "npm start"

Route for Customer ID:
Method - GET
Route - /customer/:id
PK(:id) - Customer_ID
