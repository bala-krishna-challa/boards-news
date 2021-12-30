import { MouseEventHandler } from "react";
import styled from "styled-components";

export interface ButtonProps {
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const ButtonElement: React.FC<ButtonProps> = ({
  disabled = false,
  type = "button",
  className = "",
  onClick,
  children,
}) => {
  if (disabled) {
    // Here we add class
  }
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Button = styled(ButtonElement)`
  background-color: transparent;
  border: none;
  color: ${(props) => (props.disabled ? "#ccc" : "red")};
  outline: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;
`;
