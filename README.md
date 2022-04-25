# Quotastic backend API

## Running the app

## development

npm run start

## watch mode

npm run start:dev

## production mode

npm run start:prod

# endpoints

## /login(Protected) POST

get email, password and respond with JWT

## /signup POST

get email, firstname, lastname, password, repeated password and respond with sucess or failure message.

## /me(Protected) GET

return user profile

## /myquote(Protected) POST

get quote data and return updated quote or error

## /list GET

return all quotes

## /list/random GET

return random quote

## /list/date GET

return quotes sorted by publish date(most recent first)

## /users/:id GET

return user with his quote or quote with null values if user dont have one

## /users/:id/upvote(Protected) POST

get id of quote in params and return quote if sucess or message if quote was already voted

## /users/:id/downvote(Protected) POST

endpoint for downvote
