import React, { useContext, useState,useEffect } from 'react'
import axios from 'axios';
import "./CSS/card.css"
import UserContext from '../context/UserContext/UserContext';
function WishlistCard(props) {
  const { isLogin, username, token } = useContext(UserContext)
  const [quantity, setQunatity] = useState(1)
  const [image, setImage] = useState(null)
  const [outOfStock, setOutOfStock] = useState(false)


  useEffect(() => {
    if (props.productValue.stock == 0) {
      setOutOfStock(true)
    }
  }, [])

  const incrementQuantity = () => {
    if (quantity < props.productValue.stock) {

      setQunatity(prev => prev + 1)
    }
  }
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQunatity(prev => prev - 1)
    }
  }


  const removeFromWishlist = () => {
    // const data = {
    //   username: "username",
    //   product_name: props.productValue._id,
    //   quantity: quantity,
    //   price: quantity*props.productValue.price
    // }
    console.log(props.productValue._id)
    axios.delete(`http://localhost:9000/user/wishlist/delete/${props.cart._id}`, { headers: { "token": token } }).then(result => {
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
  const addToCart = () => {
    const data = {
      username: username,
      product_name: props.productValue._id,
      quantity: quantity,
      price: quantity * props.productValue.price
    }

    axios.post("http://localhost:9000/user/cart/add-item", JSON.stringify(data), { headers: { 'Content-Type': "application/json", "token": token } }).then(result => {
      console.log(result.data)
      console.log("hello")
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
    <div className="card h-100">
      {/* <img src="frontend\public\images\heroImg.jpg" className="card-img-top" alt="..." /> */}





      <img src={`http://localhost:9000/user/products/${props.productValue.productName}.jpg`} className="card-img-top" alt="..."></img>
      <div className="card-body">
        {/* <img src=/> */}
        <h5 className="card-title productName">{props.productValue.productName}</h5>
        <p className="card-text companyName ">{` by ${props.productValue.companyName}`}</p>
        <p className="card-text priceValue">{` Rs.${props.productValue.price}`}</p>
        <p className="card-text tagsLabel">{`Tags: ${props.productValue.tags}`}</p>
        {isLogin && !outOfStock && <div className='quantity-div'>
          <button className="btn btn-primary" onClick={incrementQuantity}>+</button>
          <p>{quantity}</p>
          <button className="btn btn-primary" onClick={decrementQuantity}>-</button>
        </div>}
        {isLogin && <button type="submit" className="btn btn-primary" onClick={removeFromWishlist}>Remove From Wishlist</button>}
        {isLogin && !outOfStock && <button type="submit" className="btn btn-primary" onClick={addToCart}>Add To Cart</button>}
      </div>
    </div>
  )
}

export default WishlistCard
