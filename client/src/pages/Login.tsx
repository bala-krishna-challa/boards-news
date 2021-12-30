import { isValidEmail } from "../services/validator.service";
import { AuthEmitter } from "../emitters/AuthEmitter";
import { useHistory } from "react-router-dom";
import { Button, ButtonProps } from "../UI/controls/Button";
import { useInput } from "../hooks/useInput";
import { FormInput, FormInputProps } from "../UI/form/FormInput";

const Login: React.FC = () => {
  const {
    value: emailValue,
    isValid: isEmailValid,
    isDirty: isEmailDirty,
    error: emailError,
    changeHanlder: emailChangeHanlder,
    blurHanlder: emailBlurHandler,
  } = useInput({
    initValue: "",
    validators: [{ isValid: isValidEmail, error: "Invalid Email Id!" }],
  });

  const history = useHistory();
  const { next } = AuthEmitter;

  const submitHandler = () => {
    next({ isAuthenticated: true, email: emailValue });
    history.push("/boards");
  };

  console.log("isEmailDirty", isEmailDirty);

  const formEmailConfig: FormInputProps = {
    inputConfig: {
      invalid: isEmailDirty && !isEmailValid,
      elementType: "input",
      value: emailValue,
      elementConfig: { type: "email", placeholder: "Your E-Mail" },
      changeHandler: emailChangeHanlder,
      blurHandler: emailBlurHandler,
    },
    label: "Your E-Mail",
    error: emailError,
  };

  const buttonConfig: ButtonProps = {
    disabled: !isEmailValid,
    onClick: submitHandler,
  };

  return (
    <div>
      <FormInput {...formEmailConfig} />
      <Button {...buttonConfig}>Login</Button>
    </div>
  );
};

export default Login;
