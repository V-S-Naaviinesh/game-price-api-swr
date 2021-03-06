
import './App.css';
import {useState} from 'react';
import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then((res)=> res.json())

function App() {

  const [gameTitle, SetGameTitle] =useState('')
  const [searchedGames, setSearchedGames]=useState([])
 


  const {data } = useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3' , fetcher )

  const searchGame =()=>{
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
    .then((res)=>res.json())
    .then((data)=>{
      setSearchedGames(data)
    })
  }

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search For A Game</h1>
        <input type='text' placeholder='Portal...' onChange={(e)=>{SetGameTitle(e.target.value)}}/>
        <button onClick={searchGame}>Search Game Title</button>
        <div className='games'>
          {searchedGames.map((game, key)=>{
            return (
              <div className='game' key={key}>
                {game.external}
                <img src= {game.thumb} alt='game'/>
                ${game.cheapest}
                </div>
            )
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>Latest Deals</h1>
        <div className='games'>
        {data && data.map((game, key)=>{
          return <div className='game' id='deals' key={key}>
             <img src= {game.thumb} alt='game'/>
            <h3>{game.title}</h3>
            <p>Normal Price:${game.normalPrice}</p>
            <p>Sale Price:${game.salePrice}</p>
            <h3>You save:{game.savings.substr(0, 2)}%</h3>
          </div>
        })}
        </div>
      </div>
    </div>
  );
}

export default App;
