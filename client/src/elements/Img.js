import React from "react";
import styled from "styled-components";

const Img = React.forwardRef((props, ref) => {

    const src = props.src;

    return <Image {...props} src={src}></Image>;
    
})

Img.defaultProps = {
    width: "128px",
    height: "128px",
};

const Image = styled.img`
    width: ${({ width }) => width };
    height: ${({ height }) => height };
`;

export default Img;
