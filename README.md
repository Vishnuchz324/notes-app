# Notes App

- A personal note keeping app
- Allows users to register and then record your notes and also view or delete them
- Labels can be created and notes tagged and serached using these labels

## Tools Used

- Front end using `React Js` styles with `Material UI`
- Backend served by a `Flask` Api
- Build on a `SQL` Database

## Required Install

- **_node js_** and **_npm_**

- **_python_**

- **_sqlite3_**

## How To Start

- ### Setting Up Frontend

  - Install all necessary node packages using the command `npm install`
  - Start the react app using the command `npm start`
  - Runs the app in the development mode.
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- ### Setting Up Backend
  - Move into the server directory `cd server`
  - Install `pipenv` a popular packaging tool for python using the command `pip install pipenv`
  - Create a new virtual enviornment using the command `pipenv shell`
  - Install all the necessary python packages using the command `pipenv install`
  - Setup the flask enviornment vaiables by commands\
     `$env:FLASK_APP='api'` in windows powershell\
     `export FLASK_APP=api` in linux
  - Initialise the Databse using the command `flask init-db`
  - Start the server using the command `flask run`
  - Runs the flask server in the development mode.
    in [http://localhost:5000](http://localhost:5000) of your browser

### Enjoy Note Taking :smile: :pencil:
