import React from "react";
import styled from "styled-components";

function Form(props) {
  return <Fm {...props}></Fm>;
}

Form.defaultProps = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    boxSizing: "border-box",
};

const Fm = styled.form`
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
  box-sizing: ${({ boxSizing }) => boxSizing};
`;

export default Form;
