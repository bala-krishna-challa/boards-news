import { useContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { AppContext } from "../providers/app-context/AppContext";
import Overlay from "./Overlay";

const StyledLoader = styled.div`
  border: 5px solid #f3f3f3;
  animation: spin 1s linear infinite;
  border-top: 5px solid #555;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 3;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FC = () => {
  const { isLoading } = useContext(AppContext);

  if (!isLoading) {
    return null;
  }

  const loader = (
    <Overlay>
      <StyledLoader></StyledLoader>
    </Overlay>
  );

  return createPortal(loader, document.getElementById("modal") as HTMLElement);
};

export default Loader;
