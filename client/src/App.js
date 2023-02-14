import logo from './logo.svg';
import { useState } from 'react'
import './App.css';
import axios from 'axios'
import { MagnifyingGlass } from 'react-loader-spinner'
import { CSVLink } from "react-csv";

function App() {
  const [search, setSearch] = useState("")
  const [data5, setData] = useState([])
  const [state, setState] = useState(false)

  const handleClick = () => {
    if (!search) {
      alert("write value first")
      return
    }
    setData([])
    setState(true)
    console.log('clicked')

    axios.get("http://localhost:5009/" + search)
      .then((res) => {
        console.log(res.data)
        setState(false)
        setData(res.data)

      })
      .catch((e) => {
        console.log(e)
      })
  }

  const headers = [
    { label: "First Name", key: "name" },
    { label: "Price", key: "price" },
    { label: "Minimun Order", key: "minOrder" },
    { label: "Image", key: "image" },
    { label: "Link", key: "link" },
  ];




  return (
    <div className="App">
      <div className='left'>

        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleClick}>Search</button>

        {data5.length !== 0 &&
          <CSVLink className='link' data={data5} headers={headers}>
            Download me
          </CSVLink>}
        {state && <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor='#c0efff'
          color='#e15b64'
        />}
      </div>
      <div className='right'>
        <h1>ALIBABA SCRAPPER</h1>
      </div>
    </div>
  );
}

export default App;
