import React, { useState } from 'react'

const Carousal = () => {

    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: '10' }}>
                        <div class="d-flex justify-content-center">
                            <input class="form-control me-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" />
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
    )
}

export default Carousal