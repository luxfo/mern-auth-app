export const isValidEmail = (email) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateInput = (e, input) => {
  let { name, value } = e.target;
  const err = {};

  switch (name) {
    case "firstName":
      if (!value) {
        err[name] = "Please enter First Name.";
      }
      break;
    case "lastName":
      if (!value) {
        err[name] = "Please enter Last Name.";
      }
      break;
    case "email":
      if (!value) {
        err[name] = "Please enter an Email.";
      } else if (!isValidEmail(value)) {
        err[name] = "Email format is incorrect.";
      }
      break;
    case "password":
      if (!value) {
        err[name] = "Please enter Password.";
      } else if (input.confirmPassword && value !== input.confirmPassword) {
        err["confirmPassword"] =
          "Password and Confirm Password does not match.";
      } else {
        err["confirmPassword"] = input.confirmPassword
          ? ""
          : err["confirmPassword"];
      }
      break;

    case "confirmPassword":
      if (!value) {
        err[name] = "Please enter Confirm Password.";
      } else if (input.password && value !== input.password) {
        err[name] = "Password and Confirm Password does not match.";
      }
      break;

    case "verificationCode":
      if (!value) {
        err[name] = "Please enter a Verification Code.";
      }
      break;

    default:
      break;
  }

  return err;
};
