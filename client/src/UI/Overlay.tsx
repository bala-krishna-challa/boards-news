import styled from "styled-components";

const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
`;

const Overlay: React.FC = ({ children }) => {
  return <StyledOverlay>{children}</StyledOverlay>;
};

export default Overlay;
