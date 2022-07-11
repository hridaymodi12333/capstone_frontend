import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import TokenContext from '../context/tokenContext/tokenContext';
import UserContext from '../context/UserContext/UserContext';
import "./CSS/Login.css"

function Login() {
    const userData = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { setLoginToken, loginToken } = useContext(TokenContext)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }



    // const loginUser = ()=>{
    //     const data_user = 
    //         {
    //             username:"name2",
    //             first_name:"fname2",
    //             last_name:"lname2",
    //             email:"mail2@mail.com",
    //             phone:9876543278,
    //             token: "thisisdummytoken",
    //             role: "user",
    //             loginStatus: true
    //             }
    //     const data_admin = 
    //         {
    //             username:"name2",
    //             first_name:"fname2",
    //             last_name:"lname2",
    //             email:"mail2@mail.com",
    //             phone:9876543278,
    //             token: "thisisdummytoken",
    //             role: "admin",
    //             loginStatus: true
    //             }
    //     // setLoginToken()
    //     userData.setUser(data_adin)
    // }


    const loginUser = () => {
        const loginData = {
            email: email,
            password: password
        }
        console.log(loginData)
        fetch(`http://localhost:9000/user/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.loginStatus) {
                    // setLoginToken(result.token)
                    // console.log(result.token)
                    userData.setUser(result)
                    localStorage.setItem("userData", JSON.stringify(result))
                }
                console.log("logged in")
            })
    }



    return (
        <div className="container page-ht">
            <h1 className="textHeadStyle">Login</h1>
            <form>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleEmailChange} value={email} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePasswordChange} value={password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <NavLink to={"/"}><button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={loginUser}>Login</button></NavLink>
            </form>
            {/* {userData.username && <p> {JSON.stringify(userData.isLogin)}</p>} */}
        </div>
    )
}

export default Login
