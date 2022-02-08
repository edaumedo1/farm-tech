import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../components/Header";
import { Box, Center, Container } from "../../elements";
import WeatherBlock from "./WeatherBlock";
import { weather_uri } from "../../common/KakaoInfo";

function Weather() {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() < 10
      ? "0" + (date.getMonth() + 1).toString()
      : date.getMonth() + 1;

  const [dailyList, setDailyList] = useState([]);

  useEffect(() => {
    axios.get(weather_uri).then((res) => setDailyList(res.data.daily));
  }, []);
  console.log(dailyList);
  return (
    <>
      <Header title="Weather" />
      <DateTag>
        <Year>{year}</Year>
        <Month>{month}월</Month>
      </DateTag>
      <Box margin="0 0 5rem 0">
        {dailyList.length === 0 ? (
          <Container>
            <div>Loading...</div>
            <progress></progress>
          </Container>
        ) : (
          <Center>
            {dailyList &&
              dailyList.map((el, i) => (
                <WeatherBlock key={i} el={el} index={i} />
              ))}
          </Center>
        )}
      </Box>
    </>
  );
}

const DateTag = styled.div`
  position: absolute;
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
