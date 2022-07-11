import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'

function CouponCreate() {
    const {token} = useContext(UserContext)
    const [code, setCode] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState(0)
    


    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }
    const handleTypeChange = (e) => {
        setType(e.target.value)
    }
    const handleValueChange = (e) => {
        setValue(e.target.value)
    }
    



    const createCoupon = () => {
        const couponObj = {
            code: code,
            type: type,
            value: value
        }
        console.log(couponObj)
        fetch(`http://localhost:9000/admin/coupons/add`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                "token": token
            },
            body: JSON.stringify(couponObj)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
            })
    }
    return (
        <div>
        
            <div className="container">
                <h3 className="textHeadStyle">Create New Coupon </h3>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handleCodeChange} value={code} />
                        <label htmlFor="floatingInput">Code</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handleTypeChange} value={type} />
                        <label htmlFor="floatingInput">Type</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" onChange={handleValueChange} value={value} />
                        <label htmlFor="floatingInput">Value</label>
                    </div>
                    


                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={createCoupon}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CouponCreate
