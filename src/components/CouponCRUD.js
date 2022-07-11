import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext/UserContext'
import CouponCreate from './CouponCrudComponents/CouponCreate'
import CouponDelete from './CouponCrudComponents/CouponDelete'
import CouponRead from './CouponCrudComponents/CouponRead'
import CouponUpdate from './CouponCrudComponents/CouponUpdate'
import UserCreate from './UserCrudComponents/UserCreate'
import UserDelete from './UserCrudComponents/UserDelete'
import UserRead from './UserCrudComponents/UserRead'
import UserUpdate from './UserCrudComponents/UserUpdate'

function CouponCRUD() {
    const { isLogin, role } = useContext(UserContext)
    const [crudOption, setCrudOption] = useState("read")
    return (
        <>
            {isLogin && role === "admin" &&
                <div className="button-group">
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("create")}} >Create New Coupon</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("read")}} >Show Coupons</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("update")}} >Update Coupon</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("delete")}} >Delete Coupon</button>
                </div>
            }

            {isLogin && role === "admin" && crudOption === "create" && <CouponCreate></CouponCreate>}
            {isLogin && role === "admin" && crudOption === "read" && <CouponRead></CouponRead>}
            {isLogin && role === "admin" && crudOption === "update" && <CouponUpdate></CouponUpdate>}
            {isLogin && role === "admin" && crudOption === "delete" && <CouponDelete></CouponDelete>}





        </>
    )
}

export default CouponCRUD
