import React from "react";
import styled from "styled-components";

function WeatherBlock({el, index}) {
  const {state, day} = el;
  console.log(index);
  return (
    <Container index={index}>
      <Day>토</Day>
      <DayNum>{day}</DayNum>
      <span>{state}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  border: 1px solid #11a83c;
  border-radius: 15px;
  padding: 1rem;
  ${(props) => props.index === 0 ? "margin-top: 30px;" : "margin-top: 20px;"}
  
`;

const Day = styled.span`
  line-height: 2rem;
  font-size: 2rem;
  font-weight: bold;
`;

const DayNum = styled.span`
  font-size: 1.5rem;
  line-height: 2rem;
`;

export default WeatherBlock;
