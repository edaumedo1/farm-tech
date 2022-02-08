import React from "react";
import { Link } from "react-router-dom";
import { Box  } from "../elements"; // STYLE
import {HomeTwoTone, CalendarTodayTwoTone, AssessmentTwoTone, WbSunnyTwoTone, AccountCircleTwoTone} from '@mui/icons-material';
import {useMediaQuery} from 'react-responsive';
function Navigation() {
  const isMobile = useMediaQuery({
    query: '(max-width: 400px)'
  })
  return (// Link = to="": (JAVA)href=""
  <>
    {isMobile ? <Box display="flex" rowSortKind="space-around" position="fixed" bgcolor="white"  bottom="0" fontSize="32px">
        <li>
          <Link to="/canlendar"><CalendarTodayTwoTone/></Link>
        </li>
        <li>
          <Link to="/graph"><AssessmentTwoTone/></Link>
        </li>
        <li>
          <Link to="/"><HomeTwoTone/></Link>
        </li>
        <li>
          <Link to="/weather"><WbSunnyTwoTone/></Link>
        </li>
        <li>
          <Link to="/profile"><AccountCircleTwoTone/></Link>
        </li>
      </Box>: <Box width="100%" position="fixed" bgcolor="white" top="0" fontSize="16px">
        <Box display="flex" width="30rem" margin="0 auto" rowSortKind="space-around" >
          <li>
            <Link to="/canlendar">달력</Link>
          </li>
          <li>
            <Link to="/graph">시세</Link>
          </li>
          <li>
            <Link to="/weather">날씨</Link>
          </li>
          <li>
            <Link to="/profile">내 정보</Link>
          </li>
        </Box>
      </Box>}
  </>
      
  );
}



export default Navigation;