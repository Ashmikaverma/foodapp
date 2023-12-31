import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
//import Carousel from '../components/Carousel';
//import './Home.css';
export default function Home() {
  const [search,setSearch]=useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    response = await response.json();
    //console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="page">
      <div>
        <Navbar />
      </div>
      <div>
    <div id="carouselExampleCaptions" className ="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain!important"}}>
  <div className ="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"className ="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className ="carousel-inner">
    <div className ="carousel-item active">
      <img src="https://source.unsplash.com/random/900×700/?pizza" className ="d-block w-100"  style={{filter:"brightness(50%)"}} alt="..."/>
      <div lassName ="carousel-caption d-none d-md-block">
      <div className="d-flex justify-content-center">
      <input className ="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/*<button className ="btn btn-outline-success" type="submit">Search</button>*/}
      </div>
        
      </div>
    </div>
    <div className ="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?burger" className  ="d-block w-100" style={{filter:"brightness(50%)"}} alt="..."/>
      <div className ="carousel-caption d-none d-md-block">
      <div className="d-flex justify-content-center">
      <input className ="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/*<button className ="btn btn-outline-success" type="submit">Search</button>*/}
      </div>
      </div>
    </div>
    <div  className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?french fries" className ="d-block w-100"   style={{filter:"brightness(50%)"}} alt="..."/>
      <div className ="carousel-caption d-none d-md-block">
      <div className="d-flex justify-content-center">
      <input className ="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/*<button className ="btn btn-outline-success" type="submit">Search</button>*/}
      </div>
      </div>
    </div>
  </div>
  <button classNmae="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className ="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className ="visually-hidden">Previous</span>
  </button>
  <button className ="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span  className ="carousel-control-next-icon" aria-hidden="true"></span>
    <span className ="visually-hidden">Next</span>
  </button>
</div>
  </div>
      <div className="container">
      {foodCat.length > 0 ? (
  foodCat.map((data) => (
    <div key={data._id} className="fs-3 m-3">
      {data.CategoryName}
      <hr />
      <div className="row">
        {foodItem.length > 0 &&
          foodItem
            .filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
            .map((filterItems) => (
              <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                <Card foodItem={filterItems}
                options={filterItems.options[0]}></Card>
              </div>
            ))}
      </div>
    </div>
  ))
) : (
  <div>No such data</div>
)}
      </div>
      <div>
        <Footer />
      </div>
    </div>
   
  );
}