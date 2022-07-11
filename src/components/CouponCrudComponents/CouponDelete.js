import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'

function CouponDelete() {
    const {token} = useContext(UserContext)
    const [code, setCode] = useState("")
    const handleCodeChange = (e)=>{
        setCode(e.target.value)
    }


    const deleteCoupon = ()=>{
        fetch(`http://localhost:9000/admin/coupons/delete/${code}`,{method:'DELETE', headers:{"token": token}}).then(res=>res.json()).then(result=>{
            console.log(result)
        })
    }
    return (
        <div>
            {/* Delete User */}
            <div className="container">
                <h3 className="textHeadStyle">Delete a Coupon </h3>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handleCodeChange} value={code} />
                        <label htmlFor="floatingInput">Code</label>
                    </div>



                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={deleteCoupon}>Delete</button>
                </form>
            </div>
        </div>
    )
}

export default CouponDelete
