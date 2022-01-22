import React from "react";
import styled from "styled-components";

const Input = React.forwardRef((props, ref) => {
    return <Ipt {...props} ref={ref} ></Ipt>;
})

Input.defaultProps = {
    width: "17em",
    height: "2.5em",
    margin: "10px 0",
    padding: "1px 15px",
    borderRadius: "10px",
    borderStyle: "none",
    border: "1px solid #89db41", //11A83C
    fontSize: "16px",
};

const Ipt = styled.input`
    width: ${({ width }) => width };
    height: ${({ height }) => height };
    margin: ${({ margin }) => margin };
    padding: ${({ padding }) => padding };
    border-radius: ${({ borderRadius }) => borderRadius};
    border-style: ${({ borderStyle }) => borderStyle};
    border: ${({ border }) => border };
    font-size: ${({ fontSize }) => fontSize};
    ${({ float }) => float ? "float:" + float : ""};
    ${({ background }) => background ? "background:" + background : ""};
`;

export default Input;
