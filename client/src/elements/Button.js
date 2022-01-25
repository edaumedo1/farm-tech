import React from "react";
import styled from "styled-components";

const Button = React.forwardRef((props, ref) => {
    const children = props.children;

    return <Btn {...props} ref={ref} >{children}</Btn>;
    
})

Button.defaultProps = {
    width: "4.5em",
    height: "40px",
    margin: "10px 0",
    borderRadius: "10px",
    borderStyle: "none",
    fontSize: "16px",
    fontWeight: "bold",
};

const Btn = styled.button`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    margin: ${({ margin }) => margin};
    border-radius: ${({ borderRadius }) => borderRadius};
    border-style: ${({ borderStyle }) => borderStyle};
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    ${({ float }) => float ? "float:" + float : ""};
    ${({ background }) => background ? "background:" + background : ""};
`;

export default Button;
