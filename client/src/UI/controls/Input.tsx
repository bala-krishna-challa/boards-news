import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface SelectOption {
  value: string | number;
  displayText: string;
}

interface ElementConfig {
  type?: string;
  options?: SelectOption[];
  placeholder?: string;
}

export interface InputProps {
  invalid?: boolean;
  elementType: string;
  value: string;
  elementConfig: ElementConfig;
  changeHandler?: ChangeEventHandler<HTMLElement>;
  blurHandler?: ChangeEventHandler<HTMLElement>;
  className?: string;
}

const InputElement: React.FC<InputProps> = ({
  invalid = false,
  elementConfig,
  elementType,
  className = "",
  changeHandler = undefined,
  blurHandler = undefined,
  value,
}) => {
  let inputElem = null;

  const handlers: any = {};
  if (changeHandler) handlers.onChange = changeHandler;

  if (blurHandler) handlers.onBlur = blurHandler;

  switch (elementType) {
    case "input":
      inputElem = (
        <input
          className={className}
          value={value}
          {...elementConfig}
          {...handlers}
        />
      );
      break;
    case "textarea":
      inputElem = (
        <textarea
          className={className}
          value={value}
          {...elementConfig}
          {...handlers}
        />
      );
      break;
    case "select":
      inputElem = (
        <select className={className} value={value} {...handlers}>
          {elementConfig.options &&
            elementConfig.options.map((o: SelectOption, index: number) => (
              <option key={index} value={o.value}>
                {o.displayText}
              </option>
            ))}
        </select>
      );
      break;
    default:
      inputElem = (
        <input
          className={className}
          value={value}
          {...elementConfig}
          {...handlers}
        />
      );
      break;
  }

  return inputElem;
};

export const Input = styled(InputElement)`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  display: block;
  border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  :hover {
    outline: none;
    background-color: #ccc;
  }
`;
