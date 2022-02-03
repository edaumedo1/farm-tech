import React from "react";
import styled from "styled-components";

const Box = React.forwardRef((props, ref) => {

    return <Div {...props} ></Div>;
    
})

Box.defaultProps = {
    width: "100%",
    height: "auto",
    margin: "0px",
    display: "block",
    gap: "0px",
    textAlign: "left",
    padding: "0px",
};

const Div = styled.div`
    width: ${({ width }) => width };
    height: ${({ height }) => height };
    margin: ${({ margin}) => margin };
    display: ${({ display}) => display };
    gap: ${({ gap}) => gap };
    text-align: ${({ textAlign}) => textAlign };
    padding: ${({ padding}) => padding };
    ${({ background }) => background ? "background:" + background : ""};
    ${({ borderRadius }) => borderRadius ? "border-radius:" + borderRadius : ""};
    ${({ fontWeight }) => fontWeight ? "font-weight:" + fontWeight : ""};
    ${({ fontSize }) => fontSize ? "font-size:" + fontSize : ""};
    ${({ position }) => position ? "position:" + position : ""};
    ${({ top }) => top ? "top:" + top : ""};
    ${({ bottom }) => bottom ? "bottom:" + bottom : ""};

`;

export default Box;
