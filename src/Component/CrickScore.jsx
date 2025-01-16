import React, { useEffect, useState } from 'react';
import logo from '../logo.png';

const CrickScore = () => {

  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState();
  const [searchData, setSearchData] = useState("");

  const getData = async () => {
    try {
      const response = await fetch("https://api.cricapi.com/v1/cricScore?apikey=66a50c14-e33e-49af-aca2-8a477f1d78f6");

      const data = await response.json();
      console.log(data);
      setData(data.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    setInputData(e.target.value);
  }

  const handleButton = () => {
    setSearchData(inputData);
    getData();
  }

  return (
    <div className='main-container'>
      <div className="company">
        <img src={logo}/>
        <h4>CrickScore</h4>
      </div>
      <div className="searchBar">
        <input type="text" placeholder="Search Match, series" onChange={ handleInput }/>
        <button onClick={ handleButton }>Search</button>
      </div>
      
      <div className="heading">
        <p>Live Cricket Score App</p>
      </div>
      <div className="container">
        {data ? data.map((curval) => {
          if(curval.status != "Match not started"){
            if(curval.series.includes(searchData) || curval.matchType.includes(searchData) || curval.t1.includes(searchData) || curval.t2.includes(searchData)){
              return(
                <div className='card'>
                  <h3>{curval.series}</h3>
                  <h3> 🏏 {curval.matchType} 🏏 </h3>
                  <div className="img">
                    <div className='innerimg'>
                      <img src={curval.t1img}/>
                      <p>{curval.t1}</p>
                      <p>{curval.t1s}</p>
                    </div>
                    <div className='innerimg'>
                      <img src={curval.t2img}/>
                      <p>{curval.t2}</p>
                      <p>{curval.t2s}</p>
                    </div>
                  </div>
                  <p className='status'>Status: {curval.status}</p>
                </div>
              )
            }
            if(searchData === ""){
              return(
                <div className='card'>
                  <h3>{curval.series}</h3>
                  <h3> 🏏 {curval.matchType} 🏏 </h3>
                  <div className="img">
                    <div className='innerimg'>
                      <img src={curval.t1img}/>
                      <p>{curval.t1}</p>
                      <p>{curval.t1s}</p>
                    </div>
                    <div className='innerimg'>
                      <img src={curval.t2img}/>
                      <p>{curval.t2}</p>
                      <p>{curval.t2s}</p>
                    </div>
                  </div>
                  <p className='status'>Status: {curval.status}</p>
                </div>
              )
            }
          }
        })
        : <p>Data Not Found</p>}
      </div>
    </div>
  );
};

export default CrickScore