// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

const stock = require('./stock.js');

const company = process.argv.slice(2);

stock.get(company);
