import getPasswordStrength from "strong-password-check";

const config = {
  lowercase: true,
  uppercase: true,
  digits: true,
  specialChars: true,
  minLength: 8,
};

export const PasswordSecureLevelBar = ({ password }) => {
  const result = getPasswordStrength(password, config);
  console.log(result);
};
