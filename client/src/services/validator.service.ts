export const isValidEmail = (value: string): boolean => {
  const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(value);
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length !== 0;
};

export const hasMinLength =
  (minLength: number) =>
  (value: string): boolean => {
    return value.trim().length > minLength;
  };
