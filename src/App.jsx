
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { MdEdit, MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';

function App() {

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editMode, setEditMode] = useState(null);


  const getData = async () => {
    try {
      const res = await axios.get("https://68071807e81df7060eb8cd3b.mockapi.io/emp/colddrink");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  console.log(data)


  const sendEditData = async (e) => {
    e.preventDefault();
    // console.log(name,price);

    try {
      const drinkData = { name, price };

      if (editMode) {
        await axios.put(`https://68071807e81df7060eb8cd3b.mockapi.io/emp/colddrink/${editMode}`, drinkData);
        toast.info('Data Updated...😎')
        getData();
        setName('');
        setPrice('');
        setEditMode(null);
      }
      else {
        await axios.post("https://68071807e81df7060eb8cd3b.mockapi.io/emp/colddrink", drinkData);
        toast.success('Data Added...😎')
        getData();
        setName('');
        setPrice('');
      }

    } catch (error) {
      console.log(error);
    }
  }


  const remove = async (id) => {
    await axios.delete(`https://68071807e81df7060eb8cd3b.mockapi.io/emp/colddrink/${id}`);
    toast.warning('Data Deleted...')
    getData();
  }


  const edit = (id, name, price) => {
    setName(name);
    setPrice(price);
    setEditMode(id);
  }

  return (
    <div id='wrapper'>
      <div style={{ padding: '7rem 4rem' }}>

        <h2>{editMode ? "🍹Update Your Order🍹" : "🍹Add Your SoftDrink🍹"}</h2>
        <form onSubmit={sendEditData}>
          <label>SoftDrink Name :</label>
          <input type="text" value={name} placeholder='Enter Your Softdrink...' onChange={(e) => { setName(e.target.value) }} />

          <label>SoftDrink Price :</label>
          <input type="text" value={price} placeholder='Enter Your Price...' onChange={(e) => { setPrice(e.target.value) }} />

          <input type="submit" value={editMode ? 'UPDATE' : 'ADD'} id='button' />

        </form>
        <ToastContainer position='top-center' />
      </div>

      <section>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {
              data.map((item) => {
                const { id, name, price } = item

                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>₹{price}</td>
                    <td onClick={() => { edit(id, name, price) }}><MdEdit className="action-icon edit" /></td>
                    <td onClick={() => { remove(id) }}><MdDelete className="action-icon delete" /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
