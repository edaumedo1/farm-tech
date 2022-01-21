import React from 'react'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <ul>
            <li><Link to="/signup">회원가입</Link></li>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/test">테스트</Link></li>
        </ul>
        
    )
}
