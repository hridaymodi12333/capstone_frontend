import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams,NavLink } from 'react-router-dom';
import TokenContext from '../context/tokenContext/tokenContext';
import UserContext from '../context/UserContext/UserContext';
// import Card from './Card'
import CartCard from './Cartcard';
import "./CSS/gallery.css"
import axios from "axios"

function CartGallery() {
    // const { loginToken } = useContext(TokenContext)
    const { username, token } = useContext(UserContext)
    // const { categoryValue } = useParams();
    const [productData, setProductData] = useState([]);
    const [cartList, setCartList] = useState([]);
    const location = useLocation()
    const [totalPrice, setTotalPrice] = useState(0)
    const [effectivePrice, setEffectivePrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [couponCode, setCouponCode] = useState("")
    const [couponData, setCouponData] = useState({})
    // const [username, setUsername] = useState("username")
    // console.log(categoryValue)




    const calculateEffectivePrice = (coupon, total) => {
        if (coupon.type === "fix") {
            return total - coupon.value
        }
        else {
            return total - (total * (coupon.value / 100))
        }
    }


    useEffect(() => {
        const func = () => {
            let arr = []

            const user = JSON.parse(localStorage.getItem("userData"))
            console.log(user.username)
            fetch(`http://localhost:9000/user/cart/username/${user.username}`, { headers: { "token": user.token } }).then(res => res.json()).then(async (result) => {
                // setProductData(result);    
                console.log(result)
                console.log("this is result")
                setCartList(result)
                let finalPrice = 0
                const array = await Promise.all(result.map(async (item) => {
                    const response = await fetch(`http://localhost:9000/user/products/id/${item.product_name}`)

                    const data = await response.json();
                    // setTotalPrice(prev=> prev + item.price)
                    finalPrice = finalPrice + item.price
                    // arr.push(data)
                    // console.log(arr)
                    return data;
                }))

                setProductData(array);
                setTotalPrice(finalPrice)
                setEffectivePrice(finalPrice)
            })

        }

        func()

    }, [])

    const applyCoupon = () => {
        fetch(`http://localhost:9000/user/coupons/code/${couponCode}`,{headers:{"token":token}}).then(res => res.json()).then(result => {
            console.log(result)
            setCouponData(result)
            if (result.type === "fix") {
                console.log("fix")
                // setTotalPrice(prev=>prev-result.value)
                setDiscountPrice(result.value)
                setEffectivePrice(totalPrice - result.value)
                
            }
            else {
                console.log("percent")
                // console.log(totalPrice - result.value)
                
                setDiscountPrice((totalPrice * result.value / 100))
                setEffectivePrice(totalPrice - (totalPrice * result.value / 100))
            }
            // setTotalPrice(prev=>{
            //     if(result.type==="fix"){

            //         return prev-result.value
            //     }
            //     else{

            //         return prev-(prev*(result.value/100))
            //     }
            // })
        })
    }

    // useEffect(()=>{
    //     fetch(`http://localhost:9000/user/coupons/code/${couponCode}`,{headers:{"Content-Type":"application/json"}}).then(res=>res.json()).then(result=>{
    //         console.log(result)
    //         setCouponData(result)
    //         setTotalPrice(calculateEffectivePrice(result, totalPrice))
    //     })
    // },[couponCode])

    const handleCouponCode = (e) => {
        setCouponCode(e.target.value)
    }


    const buyNow = () => {
        cartList.map((item, index) => {
            const data = {
                sold: productData[index].sold + item.quantity,
                stock: productData[index].stock - item.quantity
            }
            fetch(`http://localhost:9000/admin/products/update/${item.product_name}`, { method: "PUT", headers: { 'Content-Type': 'application/json', "token": token }, body: JSON.stringify(data) }).then(res => res.json()).then(result => {
                console.log(result)
            })


            axios.delete(`http://localhost:9000/user/cart/delete/${item._id}`, { headers: { "token": token } }).then(result => {
                console.log(result.data)
                console.log("hello")
                //   setQunatity(0)
                window.location.reload()
            }).catch(err => { console.log(err.data) })


        })



    }

    return (

        // <div className="row row-cols-1 row-cols-md-3 g-4 my-3 appWrapper galleryView">
        <div className='payment-card-container' >


            <div className='appWrapper galleryView'>
            {productData.map((product, index) => {
                product.price = cartList[index].price
                // setTotalPrice(prev=>prev+product.price)
                return (
                    <CartCard key = {product.productName} productValue={product} cart={cartList[index]}></CartCard>
                )
            })}
            </div>

            <div className='payment-view my-4'>
                <div className='coupon-card'>
                <input type="text" className="text-box" value={couponCode} onChange={handleCouponCode} placeholder="Enter Coupon Code"/>
                <button  className='btn btn-primary' onClick={applyCoupon}>Apply</button>
                </div>


                <div className="price-card">
                <h5>Total Amount</h5>
                <h6>{totalPrice}</h6>
                <h5>Discount</h5>
                <h6>{discountPrice}</h6>
                <hr/>
                <h5>Payable Amount</h5>
                <h6>{effectivePrice}</h6>
                {/* <p>{calculateEffectivePrice(couponData,totalPrice):totalPrice}</p> */}

                <NavLink to="/user/order-confirm" className='btn btn-primary '  onClick={buyNow}>Place Order</NavLink>
                </div>
            </div>
            
        </div>
    )
}

export default CartGallery
