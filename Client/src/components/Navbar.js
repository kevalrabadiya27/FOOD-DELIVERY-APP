import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { ShoppingCartOutlined, Logout, DeliveryDiningOutlined, Home, HomeOutlined } from '@mui/icons-material'
import Modal from '../Modal';
import Cart from '../pages/Cart';
import { useCart } from './ContextReducer';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first");

    const navigate = useNavigate();

    const handleclick = () => {
        localStorage.removeItem("authToken");
        toast.success("Sucessfully logout")
        navigate("/");
    }
    const items = useCart();
    const loadCart = () => {
        setCartView(true)
        navigate("/Cart");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">
                        <img src='https://cdn.neighbourly.co.nz/images/cache/business_item_logo_full_size/attachments/5e7089c42497b3.82224860.png?170410' style={{ width: "80px", marginTop: '-5px' }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active mx-3 fs-5" aria-current="page" to="/"><HomeOutlined></HomeOutlined> Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to="/myorder"><DeliveryDiningOutlined></DeliveryDiningOutlined> My Orders</Link>
                                    </li> : ""
                            }
                        </ul>
                        {
                            (!localStorage.getItem("authToken")) ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-1  fs-6" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1 fs-6" to="/signup">Signup</Link>
                                </div> :
                                <>
                                    <div className="btn bg-white text-success mx-2  fs-6 " onClick={loadCart}><ShoppingCartOutlined />Cart
                                        {(
                                            items.length == 0 ? "" :
                                                <Badge pill bg="danger">{items.length}</Badge>
                                        )}
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}
                                    <div className="btn bg-white text-success mx-2  fs-6" onClick={handleclick}><Logout />Logout
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar