import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import UserContext from '../../context/UserContext/UserContext'

function CouponRead() {
    const {token} = useContext(UserContext)
    const [couponData, setCouponData] = useState([])

    useEffect(() => {
        // fetch(`http://localhost:9000/admin/users/read-all`)
        //     .then(res => res.json())
        //     .then(result => {
        //         console.log(result)
        //         setUserData(result)
        //     })

        axios.get(`http://localhost:9000/admin/coupons/read-all`, {headers:{"token": token}}).then(res => {
            console.log(res.data)
            setCouponData(res.data)
        }).catch(err => { console.log(err) })
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            Coupons
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Code</th>
                        <th scope="col">Type</th>
                        <th scope="col">Eligibility</th>
                        <th scope="col">Value</th>
                        {/* <th scope="col">Phone</th>
                        <th scope="col">Role</th> */}
                    </tr>
                </thead>
                <tbody>
                    {couponData.map((coupon, index) => {
                        return (
                            <tr key={coupon.code}>
                                <th scope="row">{index+1}</th>
                                <td>{coupon.code}</td>
                                <td>{coupon.type}</td>
                                <td>{coupon.eligibility}</td>
                                <td>{coupon.value}</td>
                                {/* <td>{user.phone}</td>
                                <td>{user.role}</td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    )
}

export default CouponRead
