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
    ${({ rowSortKind }) => "justify-content:" + rowSortKind };
    flex-direction: ${({ flexDirection }) => flexDirection };
    ${({height}) => "height:" + height};
    ${({width}) => "width:" + width};
`;

export default Center;
