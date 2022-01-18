import React from "react";
import styled from "styled-components";

function Container(props) {
  return <Div {...props}></Div>;
}

Container.defaultProps = {
  w: "100%",
  h: "120px",
  m: 0,
  p: 0,
  display: "block",
};

const Div = styled.div`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  display: ${({ display }) => display};
  ${({ flexDirection }) =>
    flexDirection ? "flex-direction:" + flexDirection : ""}
`;

export default Container;
