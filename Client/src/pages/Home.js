import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'

const Home = () => {

    const [catFood, setcatFood] = useState([]);
    const [foodData, setfoodData] = useState([]);
    const [search, setsearch] = useState("");

    const loaddata = async () => {
        let response = await fetch("https://food-delivery-api-zdvf.onrender.com/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setfoodData(response[0])
        setcatFood(response[1])
    }

    useEffect(() => {
        loaddata()
    }, [])

    return (
        <>
            <div><Navbar /></div>
            {/* carousal */}
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: '10' }}>
                            <div class="d-flex justify-content-center">
                                <input class="form-control me-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" style={{ filter: "brightness(50%)", height: "85vh", objectFit: "cover", maxHeight: "500px" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" style={{ filter: "brightness(50%)", height: "85vh", objectFit: "cover" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300x300/?pastry" className="d-block w-100" style={{ filter: "brightness(50%)", height: "85vh", objectFit: "cover" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container m-3'>
                {
                    catFood !== []
                        ? catFood.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>{data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodData !== []
                                            ?
                                            foodData.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase()))).map((filterItems) => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card
                                                            foodItem={filterItems}
                                                            // foodName={filterItems.name}
                                                            options={filterItems.options[0]}
                                                        // Img={filterItems.img}
                                                        />
                                                    </div>
                                                )
                                            })
                                            : <div>No such data Found</div>
                                    }
                                </div>
                            )
                        })
                        : ""
                }
            </div>
            <div><Footer /></div>
        </>
    )
}


export default Home;