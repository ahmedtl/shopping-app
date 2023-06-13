import React from "react";
import "./Product.scss";
import { useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {

    const id = useParams().id;
    const [selectedImg, setSelectedImg] = useState("img");
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { loading, data, error } = useFetch(`/products/${id}?populate=*`);

    return (
        <div className="product">
            {loading ? ("loading") : (data && data.attributes ? (
                <>
                    <div className="left">
                        <div className="images">
                            <img src={import.meta.env.VITE_REACT_APP_UP_URL + data?.attributes?.img?.data?.attributes?.url}
                                alt="" onClick={e => setSelectedImg("img")} />
                            <img src={import.meta.env.VITE_REACT_APP_UP_URL + data?.attributes?.img2?.data?.attributes?.url}
                                alt="" onClick={e => setSelectedImg("img2")} />
                        </div>
                        <div className="mainImg">
                            <img src={import.meta.env.VITE_REACT_APP_UP_URL + data?.attributes[selectedImg].data?.attributes?.url}
                                alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <h1>{data?.attributes?.title}</h1>
                        <span className="price">${data?.attributes?.price}</span>
                        <p>{data.attributes?.desc}</p>
                        <div className="quantity">
                            <button onClick={() => setQuantity((prev) => prev === 1 ? 1 : prev - 1)}>-</button>
                            {quantity}
                            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                        </div>
                        <button className="add" onClick={() => dispatch(addToCart({
                            id: data.id,
                            title: data.attributes.title,
                            desc: data.attributes.desc,
                            img: import.meta.env.VITE_REACT_APP_UP_URL + data.attributes.img.data.attributes.url,
                            price: data.attributes.price,
                            quantity: quantity
                        }))}>
                            <AddShoppingCartIcon /> ADD TO CART
                        </button>
                        <div className="links">
                            <div className="item">
                                <FavoriteBorderIcon /> ADD TO WISHLIST
                            </div>
                            <div className="item">
                                <BalanceIcon /> ADD TO COMPARE
                            </div>
                        </div>
                        <div className="info">
                            <span>Vendor: Polo</span>
                            <span>Product Type: T-Shirt</span>
                            <span>Tag: T-Shirt, Women, Top</span>
                        </div>
                        <hr />
                    </div>
                </>
            ) : (
                <p>no data available </p>
            ))}
        </div>
    );
}

export default Product;