import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext/UserContext'
import UserCreate from './UserCrudComponents/UserCreate'
import UserDelete from './UserCrudComponents/UserDelete'
import UserRead from './UserCrudComponents/UserRead'
import UserUpdate from './UserCrudComponents/UserUpdate'
import "./CSS/buttons.css"
function UserCRUD() {
    const { isLogin, role } = useContext(UserContext)
    const [crudOption, setCrudOption] = useState("read")
    return (
        <>
            {isLogin && role === "admin" &&
                <div className="button-group"> 
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("create")}} >Create New Account</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("read")}} >Show Accounts</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("update")}} >Update Account</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("delete")}} >Delete Account</button>
                </div>
            }

            {isLogin && role === "admin" && crudOption === "create" && <UserCreate></UserCreate>}
            {isLogin && role === "admin" && crudOption === "read" && <UserRead></UserRead>}
            {isLogin && role === "admin" && crudOption === "update" && <UserUpdate></UserUpdate>}
            {isLogin && role === "admin" && crudOption === "delete" && <UserDelete></UserDelete>}





        </>
    )
}

export default UserCRUD
