This is backend project where I will be building my own api's and writing
To link the database you must create 2 files:

1. .env.development - inside this file you must type `PGDATABASE=nc_news`
   2 .env.test - inside this file you will type `PGDATABASE=nc_news_test`

Link to hosted version - https://kamz-be-project.herokuapp.com/api

To clone this project fork it to your github then copy the clone link in the newly forked repo, then in vscode type git clone in the terminal, then run in your terminal do npm install followed by npm run setup-dbs to set up the databases. Then finally to run the tests type in your terminal nom test. postgresql=v12.9 nide,js= v17.5.0

This project is my backend project that contains a database containing articles, users, comments and topics each are interlinked and provide multiple endpoints from which you can extract the handy information
