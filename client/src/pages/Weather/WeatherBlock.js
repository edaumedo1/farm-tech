import React from "react";
import styled from "styled-components";
import { Center } from "../../elements";

function WeatherBlock({ el, index }) {
  const { temp, dt, pop, weather } = el;
  const dateData = new Date(dt * 1000);
  const date = dateData.getDate();
  const day = dateData.getDay();
  const getDay = (day) => {
    let sDay = "";
    let color = "black";
    switch (day) {
      case 0:
        sDay = "일";
        color = "red";
        break;
      case 1:
        sDay = "월";
        break;
      case 2:
        sDay = "화";
        break;
      case 3:
        sDay = "수";
        break;
      case 4:
        sDay = "목";
        break;
      case 5:
        sDay = "금";
        break;
      case 6:
        sDay = "토";
        color = "royalblue";
        break;
      default:
        break;
    }
    return { sDay, color };
  };

  return (
    <Container index={index}>
      <Day color={getDay(day).color}>{getDay(day).sDay}</Day>
      <DayNum>{date < 10 ? "0" + date.toString() : date}</DayNum>
      <ImgContainer>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={`${weather[0].description}`}
        />
      </ImgContainer>
      <Center>
        <span style={{ color: "red", fontWeight: "bold" }}>{temp.max.toFixed(1)}</span>
        <span style={{ color: "blue", fontWeight: "bold" }}>{temp.min.toFixed(1)}</span>
      </Center>
      <span style={{color: "royalblue", fontWeight:"bold"}}>{pop*100}%</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  border: 1px solid #11a83c;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0px 1px 2px;
  ${(props) => (props.index === 0 ? "margin-top: 30px;" : "margin-top: 20px;")}
`;

const Day = styled.span`
  ${({ color }) => "color:" + color + ";"}
  line-height: 2rem;
  font-size: 2rem;
  font-weight: bold;
`;

const DayNum = styled.span`
  font-size: 1.5rem;
  line-height: 2rem;
`;

const ImgContainer = styled.div`
  width: 30px;
  height: 30px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
export default WeatherBlock;
