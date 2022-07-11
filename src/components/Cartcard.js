import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import "./CSS/card.css"
import UserContext from '../context/UserContext/UserContext';
function CartCard(props) {
  const [quantity, setQunatity] = useState(props.cart.quantity)
  const { token } = useContext(UserContext)
  // const [newPrice, setNewPrice]= useState(0)
  const price = props.cart.price / props.cart.quantity
  //   const [image, setImage]= useState(null)
  console.log(price)
  const incrementQuantity = () => {
    if(quantity<props.productValue.stock){
    setQunatity(prev => prev + 1)
    }
  }
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQunatity(prev => prev - 1)
    }
  }
  //   const addToCart = () => {
  //     const data = {
  //       username: "username",
  //       product_name: props.productValue._id,
  //       quantity: quantity,
  //       price: quantity*props.productValue.price
  //     }

  // useEffect(()=>{},[quantity])
  const removeFromCart = () => {
    // const data = {
    //   username: "username",
    //   product_name: props.productValue._id,
    //   quantity: quantity,
    //   price: quantity*props.productValue.price
    // }
    console.log(props.productValue._id)
    axios.delete(`http://localhost:9000/user/cart/delete/${props.cart._id}`, { headers: { "token": token } }).then(result => {
      console.log(result.data)
      console.log("hello")
      //   setQunatity(0)
      window.location.reload()
    }).catch(err => { console.log(err.data) })

    // axios.get("http://localhost:9000/user/products/1.jpg").then(res=>{
    //   setImage(res.data)
    //   console.log(res)
    // })
    // fetch("http://localhost:9000/user/cart/add-item", { method: "POST",  headers: { 'Content-Type': "application/json" }, body: JSON.stringify(data)}).then(res => res.json()).then(result => {
    //   console.log(result)
    // }).catch(err=>{console.log(err)})




  }
  const updateCart = () => {
    // setNewPrice(quantity*price)
    const data = {
      quantity: quantity,
      price: quantity * price
    }
    console.log(props.productValue._id)
    axios.put(`http://localhost:9000/user/cart/update/${props.cart._id}`, JSON.stringify(data), { headers: { 'Content-Type': "application/json", "token": token } }).then(result => {
      console.log(result.data)
      console.log("hello")
      //   setQunatity(0)
      window.location.reload()
    }).catch(err => { console.log(err.data) })

    // axios.get("http://localhost:9000/user/products/1.jpg").then(res=>{
    //   setImage(res.data)
    //   console.log(res)
    // })
    // fetch("http://localhost:9000/user/cart/add-item", { method: "POST",  headers: { 'Content-Type': "application/json" }, body: JSON.stringify(data)}).then(res => res.json()).then(result => {
    //   console.log(result)
    // }).catch(err=>{console.log(err)})




  }

  return (
    <div className="card ">
      {/* <img src="frontend\public\images\heroImg.jpg" className="card-img-top" alt="..." /> */}
      <img src={`http://localhost:9000/user/products/${props.productValue.productName}.jpg`} className="card-img-top" alt="..."></img>
      <div className="card-body">
        {/* <img src=/> */}
        <h5 className="card-title productName">{props.productValue.productName}</h5>
        <p className="card-text companyName ">{` by ${props.productValue.companyName}`}</p>
        <p className="card-text priceValue">{` Rs.${props.productValue.price}`}</p>
        <p className="card-text tagsLabel">{`Tags: ${props.productValue.tags}`}</p>
        <div className='quantity-div'>
          <button className="btn btn-primary" onClick={incrementQuantity}>+</button>
          <p>{quantity}</p>
          <button className="btn btn-primary" onClick={decrementQuantity}>-</button>
        </div>
        <button type="submit" className="btn btn-primary" onClick={removeFromCart}>Remove From Cart</button>
        <button type="submit" className="btn btn-primary" onClick={updateCart}>Update Cart</button>
      </div>
    </div>
  )
}

export default CartCard
