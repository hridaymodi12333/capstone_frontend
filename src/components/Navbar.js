import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext/UserContext';
import "./CSS/navbar.css"
import Cookies from "js-cookie"
// import jwt from "jsonwebtoken"
function Navbar() {
    const { isLogin, role, setUser, setIsLogin, token } = useContext(UserContext)
    // const [appTitle, setAppTitle] = useState("ShopForHome")
    const [searchValue, setSearchValue] = useState("")
    const handleOnChange = (event) => {
        setSearchValue(event.target.value);
        console.log(event.target.value)
    }

    useEffect(() => {
        const jwttoken = Cookies.get("jwt")
        // console.log(`navbar: ${token}`)
        if(jwttoken){
        // fetch("http://localhost:9000/user/auth/token").then(res=>res.json()).then(result=>{
        //     console.log(result)
        // })

        const user = JSON.parse(localStorage.getItem("userData"))
        // console.log(user)
        setUser(user)

        // const data= jwt.verify(token, "qwertyuiopasdfghjklzxcvbnmqwertyui")
        // fetch(`http://localhost:9000/user/auth/token`,{headers:{'token': token}}).then(res=>res.json()).then(result=>{
        //     console.log(result)
        //     setUser(result)
        // })
        }
        else{
            localStorage.removeItem("userData")
        }
        // eslint-disable-next-line
    }, [])
    // const [productData,setProductData]= useState([]);
    // let arr=[]
    // const handleSearchItem=()=>{
    //     fetch(`http://localhost:8000/products/${searchValue}`).then(res => res.json()).then(result => {
    //     setProductData(result);    
    //     console.log(result)
    //     })
    // }
    const logoutUser = () => {
        fetch('http://localhost:9000/user/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json', "token": token }, credentials: "include", withCredentials: true }).then(res => res.json()).then(result => {
            console.log(result)
            console.log("object")
            localStorage.removeItem("userData")
            setIsLogin(false)
            setUser({})
        })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-color">
                <div className="container-fluid">
                    <NavLink className='logo_route' to='/'><h1 className="navbar-brand logo-title">ShopForHome<span style={{fontFamily:"var(--oswald)"}}>{role === "admin" ? " : Admin" : ""}</span></h1></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link btn-active-navbar " aria-current="page" to="/">Home</NavLink>
                            </li>

                        </ul>



                        <form className="d-flex" role="search">
                            <input className="form-control me-2 search_box" type="search" placeholder="Search" aria-label="Search" value={searchValue} onChange={handleOnChange} />
                            <NavLink to={`/category/${searchValue}`}><button className="btn btn-outline-light " type="submit">Search</button></NavLink>
                        </form>

                        {/* Nav Menu for logged in User */}
                        {isLogin && role === "user" && <ul className="navbar-nav mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink className="btn-active-navbar nav-link space_cart " aria-current="page" to="/user/wishlist"> <span className="material-symbols-outlined mx-3 btn-active-navbar">favorite</span></NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="btn-active-navbar nav-link space_cart" to="/user/cart"><span className="material-symbols-outlined mx-2 btn-active-navbar">shopping_cart</span></NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link btn-active-navbar btn-active-navbar" to="/" onClick={logoutUser}>Logout</NavLink>
                            </li>

                        </ul>}

                        {/* Nav Menu for logged in Admin */}
                        {isLogin && role === "admin" && <ul className="navbar-nav mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink className="nav-link space_cart btn-active-navbar" aria-current="page" to="/admin/user-crud"> Users</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link space_cart btn-active-navbar" to="/admin/products-crud">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link space_cart btn-active-navbar" to="/admin/coupon-crud">Coupons</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link space_cart btn-active-navbar" to="/admin/reports">Reports</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link btn-active-navbar btn-active-navbar" to="/" onClick={logoutUser}>Logout</NavLink>
                            </li>

                        </ul>}

                        {/* Nav Menu for not logged in  */}
                        {!isLogin && <ul className="navbar-nav mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink className="nav-link btn-active-navbar btn-active-navbar" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link btn-active-navbar btn-active-navbar" to="/registration">Sign Up</NavLink>
                            </li>

                        </ul>}


                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
