import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {

  // create state
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
      city:'',
      country: '',
      temperature: '',
      temperature_min: '',
      humidity: '',
      icon: '',
      description: '',
  });

  // grab the data 
  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = async (city) => {
    // try catch all exceptions
      try {
      const APIKEY = '42576ca9bd1f429c4cbdb25f35f2e64e';
      // axios 
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`);
        await setAllData({
          city: result.data.name,
          country: result.data.sys.country,
          temperature: result.data.main.temp,
          temperature_min: result.data.main.temp_min,
          humidity: result.data.main.humidity,
          weatherIcon: result.data.weather[0].icon,
          description: result.data.weather[0].description,
        })
    }catch (error) {
      console.log("There is error calling API not working properly --admin: CARLO");
    }
  }
  
  // handle event 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(search);
    fetchData(search);
  }
  const handleChange =  (event) => {
    setSearch(event.target.value);
  }

  // render data
  return (
        <>
          <div className="app">
              <div className="app-header">
                  <form onSubmit= {handleSubmit}>
                    <input
                      value={search}
                      type="text"
                      placeholder='Location'
                      onChange = {handleChange}
                    />
                      <button>Search</button>
                  </form>
              </div>
              <div className="app-content">
                <div className="app-image">
                  <img src = {'https://openweathermap.org/img/wn/'+ allData.weatherIcon +'@2x.png' }/>
                </div>
                <div className="app-location">
                    <h2>{allData.city}</h2>
                    <span>{allData.country}</span>
                    <p>{allData.description}</p>
                </div>
                <div className="app-weather-temp">
                  <div className="app-info">Temparature: {allData.temperature} &#8457;</div>
                  <div className="app-info">Min Temparature: {allData.temperature_min} &#8457;</div>
                  <div className="app-info">Humidity: {allData.humidity} %</div>
                  {console.log(allData.temperature_min)}
                </div>
              </div>
              <section className="footer">Copyright 2021 Carlo Bactol | All Rights Reserved</section>
          </div>
        </>
  );
}

export default App;
