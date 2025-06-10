import './App.css';
import Card from './components/Card.jsx';
import Stats from './components/Stats.jsx';
import axios from "axios";
import { useEffect, useState } from 'react';


function App() {
  
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(true);

  
  useEffect(()=>{
    axios.get("https://dummyjson.com/products?limit=100 ").then((res)=>{
      setProducts(res.data.products)
    });
  }, []);

  // SE FILTRAN PRODUCTOS
  const filteredProducts = products.filter((p)=> p.title.toLowerCase().includes(search.toLowerCase()));
  
  // CUENTA LA CANTIDAD DE RESULTADO POR BUSQUEDA
  const totalProducts = filteredProducts.length;

  // CALCULA EL PRODUCTO CON EL PRECIO MAS ALTO (MAX)
  const maxProduct = Math.max(...filteredProducts.map((p)=>p.price));
  // CALCULA EL PRODUCTO CON EL PRECIO MAS BAJO (MIN)
  const minProduct = Math.min(...filteredProducts.map((p)=>p.price));

  return (
    <>
      <h1>SEGUNDA EVIDENCIA</h1>


      <input type='text' placeholder='Buscar producto' value={search} 
      onChange={(e)=>{setSearch(e.target.value)}} />

      <div style={{ backgroundColor: 'lightblue' }}>
        <ul>
          {filteredProducts.map((p)=> (
            <li key={p.id}>

              <Card title={p.title} price={p.price}/>

            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ backgroundColor: 'lightgreen' }}>
        <button style={{ backgroundColor: 'green' }} onClick={()=> setShow(!show)}> Ocultar </button>

        {show && <Stats total={totalProducts} max={maxProduct} min={minProduct} />}
      
        {filteredProducts.length === 0 && <div>No se encontraron productos</div>}
      </div>
      

  
    
    </>
  );
}

export default App;
