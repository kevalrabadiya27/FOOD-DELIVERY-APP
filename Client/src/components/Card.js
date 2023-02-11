import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let options = props.options;
    let priceOptions = Object.keys(options)
    const priceRef = useRef();
    const [qtn, setqtn] = useState(1);
    const [size, setsize] = useState("");
    let data = useCart();

    const handlecart = async () => {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalprice, qtn: qtn, size: size, img: props.foodItem.img })
    }
    let finalprice = qtn * parseInt(options[size]);

    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "500px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "fill" }} />
                    <div class="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className="container w-100">
                            <select className='m-2 p-2 h-100 rounded' onChange={(e) => setqtn(e.target.value)}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className='m-2 p-2 h-100 rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return (
                                        <option value={data} key={data}>{data}</option>
                                    )
                                })}
                            </select>

                            <div className='h-100 d-inline'>
                                ₹{finalprice}/-
                            </div>
                            <hr />
                            <button className='btn btn-success justify-center ms-2' onClick={handlecart} style={{ cursor: "pointer" }}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}