import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Link to="/signup">회원가입</Link>
        </div>
    )
}
