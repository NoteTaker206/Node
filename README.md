# Getting Started

# Dependancies to install

nodemon, ejs, mongoose (connects
to database to make things easier to query...look at docu for different
types of queries if i need to)
npm init -yes (gives us default package.json)
npm i express(for our server to start)
npm i mongoose(for database) ejs(for our different views)
npm i marked (create markdown and turn into html)
npm i slugify (allows us to convert a property of a schema
//into a url friendly property that will go in the url...so we dont
have long encoded id)

# Extensions to install

install ejs extension in vscode

# Start

npm run (script), which would be start in our case
we created script start in package.json

# Specific development dependancy

so we can keep server up for
development : npm i --save-dev nodemon

# Using Ejs

make sure to use install extension in vscode
and be sure to use <%= variable%> for variables
and use <-% \_partial_view%> for things like form fields
and these partial views will have an includes
