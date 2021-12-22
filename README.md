Application to extract information from bitcoin history data.

I used React and mostly vanilla javascript for this project. This web app is build mobile first. It works for bigger screens also, but is not optimised for that. 

Date range is aquired from user with basic form inputs. We do date validation before passing it to function to get data from coinGecko API. Errors are logged to console.

When dates are validated we do fetch to API with those dates, and store data to application state.

Parsed information from data is show to user with card like elements.

Todo
UI component to show user possible errors in inputs or data fetching. 
TypeScript would be good to keep track of the variable and object types.

