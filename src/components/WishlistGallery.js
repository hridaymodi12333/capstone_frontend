import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import TokenContext from '../context/tokenContext/tokenContext';
import UserContext from '../context/UserContext/UserContext';
import Card from './Card'
import "./CSS/gallery.css"
import WishlistCard from './WishlistCard';

function WishlistGallery() {
    // const { categoryValue } = useParams();
    // const{token, username} = useContext(UserContext)
    const [productData, setProductData] = useState([]);
    // const location = useLocation()
// console.log("Sofa"<"Sofa1")
    const [sortOption, setSortOption] = useState("name-a");
    const [wishList, setWishList] = useState([])
    // console.log(categoryValue)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"))
        // if (location.pathname === '/') {

        //     fetch(`http://localhost:9000/user/products/tags/all`).then(res => res.json()).then(result => {
        //         setProductData(result);
        //         console.log(result)
        //     })
        //     // axios.get(`http://localhost:9000/user/products/tags/all`).then(result => {
        //     //     setProductData(result);    
        //     //     console.log(result)
        //     //     })
        // }
        // else {
        //     // axios.get(`http://localhost:9000/user/products/tags/${categoryValue.toLowerCase()}`).then(result => {
        //     //     setProductData(result);    
        //     //     console.log(result)
        //     //     })  



        fetch(`http://localhost:9000/user/wishlist/username/${user.username}`, {headers:{"token": user.token}}).then(res => res.json()).then(async (result) => {
                // setProductData(result);    
                console.log(result)
                console.log("this is result")
                setWishList(result)
                const array = await Promise.all(result.map(async (item) => {
                    const response = await fetch(`http://localhost:9000/admin/products/id/${item.product_name}`)
    
                    const data = await response.json();
                    // arr.push(data)
                    console.log(data)
                    return data;
                }))
                
                setProductData(array);
            })




            // fetch(`http://localhost:9000/user/wishlist/username/${user.username}`, {headers:{"token": user.token}}).then(res => res.json()).then(result => {

            // if(sortOption === "name-d"){
            //     result.sort((a,b)=>{return (a.productName<b.productName? -1:1)})
            // }
            // else if(sortOption === "name-a"){
            //     result.sort((a,b)=>{return (a.productName<b.productName? 1:-1)})
            // }
            // if(sortOption === "price-d"){
            //     result.sort((a,b)=>{return (a.price<b.price? 1:-1)})
            // }
            // if(sortOption === "price-a"){
            //     result.sort((a,b)=>{return (a.price<b.price? -1:1)})
            // }


            //     setProductData(result);
            //     console.log(result)
            // })
        // }
    }, [ sortOption])

    // useEffect(() => {
    //     fetch(`http://localhost:8000/products/comfortable`).then(res => res.json()).then(result => {
    //     setProductData(result);    
    //     console.log(result)
    //     })
    // }, [])


    return (
        <>
            <div className='container'>
            {/* <div>
                    <button className="btn btn-primary" onClick={()=>{setSortOption("name-d")}} >Name: A - Z</button>
                    <button className="btn btn-primary" onClick={()=>{setSortOption("name-a")}} >Name: Z - A</button>
                    <button className="btn btn-primary" onClick={()=>{setSortOption("price-d")}} >Price: High to Low</button>
                    <button className="btn btn-primary" onClick={()=>{setSortOption("price-a")}} >Price: Low to High</button>
                </div> */}
            </div>
            {/* // <div className="row row-cols-1 row-cols-md-3 g-4 my-3 appWrapper galleryView"> */}
            <div className='appWrapper galleryView'>
                {/* {JSON.stringify(productData)} */}

                {productData.map((product,index)=>{
                // product.price = wishList[index].price
            return(
            <WishlistCard key = {product.productName} productValue={product} cart = {wishList[index]}></WishlistCard>
            )
           })}

            </div>
        </>
    )
}

export default WishlistGallery
