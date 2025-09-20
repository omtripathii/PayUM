const zod = require("zod");

const newUserValidation = zod.object({
  firstName: zod.string().min(1, "First name is required"),
  lastName: zod.string().min(1, "Last name is required"),
  username: zod.string().min(3, "Username must be at least 3 characters"),
  password: zod.string().min(8, "Password must be at least 8 characters"),
});
const inputUserValidation = zod.object({
  username: zod.string().min(3, "Username must be at least 3 characters"),
  password: zod.string().min(8, "Password must be at least 8 characters"),
});

module.exports = {
  newUserValidation,
  inputUserValidation,
};
