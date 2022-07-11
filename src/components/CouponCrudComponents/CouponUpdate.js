import React, { useContext, useState } from 'react'
import axios from "axios"
import UserContext from '../../context/UserContext/UserContext'

function CouponUpdate() {
    const { token } = useContext(UserContext)
    const [code, setCode] = useState('')
    const [searchCode, setSearchCode] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState(0)



    const handleSearchCodeChange = (e) => {
        setSearchCode(e.target.value)
    }
    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }
    const handleTypeChange = (e) => {
        setType(e.target.value)
    }
    const handleValueChange = (e) => {
        setValue(e.target.value)
    }





    const searchCoupon = () => {
        axios.get(`http://localhost:9000/admin/coupons/code/${searchCode}`, { headers: { "token": token } }).then(res => {
            console.log(res.data)
            setCode(res.data.code)
            setType(res.data.type)
            setValue(res.data.value)
            
        })
    }


    const updateCoupon = () => {
        const data = {
            code: code,
            type: type,
            value: value
        }


        fetch(`http://localhost:9000/admin/coupons/update/${searchCode}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', "token": token }, body: JSON.stringify(data) }).then(res => res.json()).then(result => {
            console.log(result)
        })

        // axios.put(`http://localhost:9000/admin/users/update/${name}`, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
        // })
        //     .then(result => {
        //         console.log(result.data)
        //     })
    }

    return (
        <div>
            {/* Update User */}
            <div className='container'>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="name@example.com" onChange={handleSearchCodeChange} value={searchCode} />
                    <label htmlFor="floatingInput">Code</label>
                </div>

                <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={searchCoupon}>Search</button>
            </div>


            <div className="container">

                <h3 className="textHeadStyle">Update a Coupon </h3>


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

                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={updateCoupon}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default CouponUpdate
