// Import dependencies
const bcrypt = require("bcrypt");

// Execute this file to generate a password
(async () => {
  // Hash the password
  const salt = await bcrypt.genSalt(15);
  console.log(await bcrypt.hash("123", salt));
})();
