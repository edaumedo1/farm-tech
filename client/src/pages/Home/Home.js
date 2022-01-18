import React from 'react'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <ul>
            <li><Link to="/Signup">회원가입</Link></li>
            <li><Link to="/Login">로그인</Link></li>
            <li><Link to="/Test">테스트</Link></li>
        </ul>
        
    )
}
