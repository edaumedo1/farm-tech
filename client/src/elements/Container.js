import React from "react";
import styled from "styled-components";

function Container(props) {
  return <Div {...props}></Div>;
}

Container.defaultProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -70%)",
};

const Div = styled.div`
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  transform: ${({ transform }) => transform};
`;

export default Container;
