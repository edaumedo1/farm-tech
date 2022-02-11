import React, { useState, useEffect, useRef } from "react";
import {NavLink, useLocation } from "react-router-dom";
import { Box, Center } from "../elements"; // STYLE
import {HomeTwoTone, DensityMedium, CalendarTodayTwoTone, AssessmentTwoTone, WbSunnyTwoTone, AccountCircleTwoTone} from '@mui/icons-material';
import {useMediaQuery} from 'react-responsive';

const showIcon = (name) => {
  switch(name){
    case "달력":
      return <CalendarTodayTwoTone/>
    case "시세":
      return <AssessmentTwoTone/>
    case "홈":
      return <HomeTwoTone/>
    case "날씨":
      return <WbSunnyTwoTone/>
    case "프로필":
      return <AccountCircleTwoTone/>
    default:
      return;
  }
}

const navList = [
  {
    name: "달력",
    path: "/calendar"
  },
  {
    name: "시세",
    path: "/graph"
  },
  {
    name: "홈",
    path: "/"
  },
  {
    name: "날씨",
    path: "/weather"
  },
  {
    name: "프로필",
    path: "/profile"
  },
];



function Navigation() {
  const isMobile = useMediaQuery({
    query: '(max-width: 800px)'
  });
  const webMenu = useRef(null);
  const [isClick, setIsClick] = useState(false);
  
  const clickButton = (e) => {
    // 정보를 찾아야겠다.
    // if(isClick && (!webMenu.current || !webMenu.current.contains(e.target))){
    if(isClick){
      setIsClick(false);
    }
  }

  const location = useLocation();
  const currentPath = location.pathname;
  
  useEffect(() => {
    window.addEventListener('click', clickButton);
    return () => {
      window.removeEventListener('click', clickButton);
    }
  });
  
  return (// Link = to="": (JAVA)href=""
  <>
    {isMobile ? <Box display="flex" rowSortKind="space-around" position="fixed" bgcolor="white"  bottom="0">
        {navList.map((item, i) =><li key={i}>
          <NavLink 
            to={item.path}
            style={(isActive) => {
            return {
              color: isActive && item.path===currentPath ? "#11a83c": ""
            }
          }}>{showIcon(item.name)}</NavLink>
        </li>)}
      </Box>: isClick ? <Box ref={webMenu} style={{zIndex: 10}} display="flex" direction="column" rowSortKind="space-around" width="20rem" height="100%" position="fixed" bgcolor="#91CC82" top="0" right="0" padding="3rem 3rem">
        <Center height="20rem" rowSortKind="space-around">
          {navList.map((item, i) =><li key={i} style={{textAlign: "center" }}>
            <NavLink 
              to={item.path}
              style={(isActive) => {
              return {
                color: isActive && item.path===currentPath ? "white": "",
                backgroundColor: isActive && item.path===currentPath ? "#6EAE57": "",
                fontWeight: "bold",
                display: "block",
                padding: "20px"
              }
            }}>{item.name}</NavLink>
            <hr style={{width:"8rem", border:"0.5px solid #6EAE57"}}/>
          </li>)}
        </Center>
        <Box>
          <div style={{fontWeight: "bold"}}>✔️주의</div>
          <span style={{fontSize: "13px"}}>메뉴를 닫으려면 초록색 바탕을 클릭하세요</span>
        </Box>
      </Box>: <Box display="flex" rowSortKind="flex-end" width="100%" position="fixed" top="0" right="0" margin="10px">
        <div onClick={() => setIsClick(true)}><DensityMedium/></div>
      </Box>}
  </>
      
  );
}

export default Navigation;
