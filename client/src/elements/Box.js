import React from "react";
import styled from "styled-components";

const Box = React.forwardRef((props, ref) => {

    return <Div {...props} ></Div>;
    
})

Box.defaultProps = {
    width: "100%",
    height: "auto",
    margin: "0px",
};

const Div = styled.div`
    width: ${({ width }) => width };
    height: ${({ height }) => height };
    margin: ${({ margin}) => margin };
`;

export default Box;
