import React from 'react'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Link to="/Signup">회원가입</Link>
            <Link to="/Test">테스트</Link>
        </div>
    )
}
