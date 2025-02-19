import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios"


function App() {
  const [searchText, setSearchText] = useState("")
  const [result, setResult] = useState([])

  useEffect (() => {
    const getData = async () => {
      const result = await axios.get(`http://localhost:4001/trips?keywords=${searchText}`);
      setResult(result.data.data);
    };
    getData();
  },[searchText]);


  return (
  <div className="App">
    <h1 className="web-title">เที่ยวไหนดี</h1>
    <div className="search-input">
      <p>ค้นหาที่เที่ยว</p>
      <form>
        <label htmlFor="seacrh">
        <input type="text"
          name="searchtext"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}></input>
        </label>
      </form>
    </div>
    
    <ul className="result-list">
        {result.map((trip) => (
          <li key={trip.eid} className="result-item">
            <img　className="preview-photo" src={trip.photos[0]} alt="สถานที่ท่องเที่ยว" />
            <div className="result-detail">
              <a className="result-title" href={trip.url}>{trip.title}</a>
              <p className="description">{trip.description}</p>
              <a className="continue-reading" href={trip.url}>อ่านต่อ</a>
              <div className="tags">
                <span>หมวด</span>
                {trip.tags.map((tag, index) => (
                  <a key={index} href="#" className="tag" onClick={() => setSearchText(tag)}>
                    {tag}
                  </a>
                ))}
              </div>
              <div className="photo-container">
                {trip.photos.slice(1, 4).map((photo, index) => (
                  <img key={index} src={photo} alt="สถานที่ท่องเที่ยว" />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
       
  </div>
  );
}

export default App;
