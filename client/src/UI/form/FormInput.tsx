import styled from "styled-components";
import { Input, InputProps } from "../controls/Input";

export interface FormInputProps {
  inputConfig: InputProps;
  label: string;
  error?: string;
  className?: string;
}

const FormInputElement: React.FC<FormInputProps> = ({
  inputConfig,
  label,
  error,
  className = "",
}) => {
  const { invalid } = inputConfig;
  return (
    <div className={className}>
      <label>{label}</label>
      <Input {...inputConfig} />
      {invalid && error && <span>{error}</span>}
    </div>
  );
};

export const FormInput = styled(FormInputElement)`
  width: 100%;
  padding: 6px 10px;
  label {
    width: 100%;
    display: block;
    text-align: left;
  }
  span {
    width: 100%;
    display: block;
    text-align: right;
    color: red;
  }
`;
