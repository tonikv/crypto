Application to extract information from bitcoin history data.

Webpage is hosted at github pages
https://tonikv.github.io/crypto/

I used React and mostly vanilla javascript for this project. This web app is build mobile first. It works for bigger screens also, but is not optimised for that. 

Date range is aquired from user with basic form inputs. We do date validation before passing it to function to get data from coinGecko API. Errors are logged to console.

When dates are validated we make fetch call to API with those dates, and store data to application state.

Utils.js contains functions to process data to get required information to user.

Todo
UI component to show user possible errors in inputs or data fetching. 
TypeScript would be good to keep track of the variable and object types.

