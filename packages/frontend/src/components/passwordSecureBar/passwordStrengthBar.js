import getPasswordStrength from "strong-password-check";
import css from "./passwordStrengthBar.module.css";

const config = {
  lowercase: true,
  uppercase: true,
  digits: true,
  specialChars: true,
  minLength: 8,
};

export const PasswordStrengthBar = ({ password }) => {
  const result = getPasswordStrength(password, config);

  let barColor = "";

  if (result.strength === "Strong") {
    barColor = css.strengthBarStrong;
  } else if (result.strength === "Moderate") {
    barColor = css.strengthBarModerate;
  } else if (result.strength === "Weak" && password.length > 0) {
    barColor = css.strengthBarWeek;
  }

  return (
    <div className={css.strengthBar}>
      <div className={barColor}></div>
    </div>
  );
};
