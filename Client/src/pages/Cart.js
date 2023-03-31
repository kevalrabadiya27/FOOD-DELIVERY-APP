import React from 'react'
import { Delete } from '@mui/icons-material'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate();
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("https://food-delivery-api-zdvf.onrender.com/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log(response);
        if (response.status === 200) {
            toast.success("Your Order Save in Database")
            dispatch({ type: "DROP" })
            navigate('/myorder')
        }

    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qtn}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price:/-{totalPrice}</h1></div>
                <div>
                    {/* <StripeCheckout
                        name="GoFood"
                        image="https://avatars.githubusercontent.com/u/1486366?v=4"
                        // billingAddress
                        // shippingAddress
                        description={`Your total is ${totalPrice}`}
                        amount={totalPrice}
                        stripeKey='pk_test_51M6DOuSILQCFtabDf7Y7sPHR1uXyeyBccih2k4EKl3SOCSlBcxQvjHqoqHBXsBaYYJqHKlTY7Ow8BI6HzI3GBHLE00iKxuW9cD'
                    >
                        <button className='btn bg-success mt-5'  >CHECKOUT NOW</button>
                    </StripeCheckout> */}
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>
        </div>
    )
}