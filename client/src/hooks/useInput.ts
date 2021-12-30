import { useState } from "react";

interface ValidatorInfo {
  isValid: (value: string) => boolean;
  error: string;
}

export interface UseInputProps {
  initValue: string;
  validators?: ValidatorInfo[];
}

export const useInput = ({ initValue, validators = [] }: UseInputProps) => {
  const [value, setValue] = useState<string>(initValue);
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState<string>("");

  console.log("useInput executing...");

  const changeHanlder = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const failValidatorIndex = validators.findIndex((v) => !v.isValid(value));
    if (failValidatorIndex !== -1) {
      setIsValid(false);
      setError(validators[failValidatorIndex].error);
    } else {
      setIsValid(true);
      setError("");
    }

    setValue(value);
  };

  const blurHanlder = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setIsDirty(true);
  };

  return {
    value,
    setValue,
    isValid,
    isDirty,
    error,
    changeHanlder,
    blurHanlder,
  };
};
