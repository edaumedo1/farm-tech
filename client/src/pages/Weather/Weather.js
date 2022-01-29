import React from "react";
import Header from "../../components/Header";
import { Center } from "../../elements";
import styled from "styled-components";
import WeatherBlock from "./WeatherBlock";

function Weather() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? "0"+(date.getMonth()+ 1).toString() : date.getMonth()+1;
  const day_array = [
    {
      day: 8,
      state: "Cloudy"
    },
    {
      day: 9,
      state: "Cloudy"
    },
    {
      day: 10,
      state: "Cloudy"
    },
    {
      day: 11,
      state: "Cloudy"
    },
    {
      day: 12,
      state: "Cloudy"
    },
    {
      day: 13,
      state: "Cloudy"
    },
  ];
  return <>
    <Header title="Weather"/>
    <Center>
      <DateTag>
        <Year>{year}</Year>
        <Month>{month}월</Month>
      </DateTag>
      {day_array.map((el, i) => <WeatherBlock key={i} el={el} index={i} />)}
    </Center>
  </>;
}

const DateTag = styled.div`
  position: fixed;
  top: 10px;
  right: 3rem;
`;

const Year = styled.div`
  margin-bottom: -0.5rem;
`;

const Month = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;


export default Weather;
