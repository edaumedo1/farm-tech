import React from "react";
import styled from "styled-components";

const Img = React.forwardRef((props, ref) => {

    const src = props.src;

    return <Image {...props} src={src}></Image>;
    
})

Img.defaultProps = {
    width: "128px",
    height: "128px",
    display: "block",
};

const Image = styled.img`
    width: ${({ width }) => width };
    height: ${({ height }) => height };
    display: ${({ display }) => display };
`;

export default Img;
