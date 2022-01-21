import React from "react";
import styled from "styled-components";

const Center = React.forwardRef((props, ref) => {

    return <Cnt {...props} ></Cnt>;
    
})

Center.defaultProps = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
};

const Cnt = styled.div`
    display: ${({ display }) => display };
    align-items: ${({ alignItems }) => alignItems };
    flex-direction: ${({ flexDirection }) => flexDirection };
`;

export default Center;
