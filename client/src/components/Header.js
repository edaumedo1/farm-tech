import React from 'react';
import { Box } from '../elements';
import styled from 'styled-components';

function Header(props) {
  const {title, goToPrevious, actThing} = props;
  return (
    <Box width="auto" height="20px" margin="10px 0 10px 15%" >
      <Title>{title}</Title>
      { goToPrevious && <Icon className="fas fa-chevron-left" onClick={goToPrevious} style={{}}></Icon>}
      
      { actThing && (
        <div onClick={actThing} style={{float: "right", marginRight: "30px"}}>
          <i className="fas fa-pencil-alt"></i>
        </div>
      )}
    </Box>
  );
}

Header.defaultProps={
  title: '',
  goToPrevious: null,
  actThing: null,
}

const Title = styled.span`
  font-family: Salsa;
  font-size: 20px;
  line-height: 20px;
`;

const Icon = styled.i`
  font-size: 20px; 
  position: absolute; 
  margin-left: 10px;
  left: 0;
`;


export default Header;
