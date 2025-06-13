import './App.css';
import Card from './components/ProductList.jsx';
import Stats from './components/StatsPanel.jsx';
import axios from "axios";
import { useEffect, useState, useRef } from 'react';


function App() {
  // ESTADOS
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [format, setFormat] = useState("")

  // REFERENCIAS
  const containerRef = useRef(null);

  // DEFINE EL LIMITE DE LA CANTIDAD DE PRODUCTOS QUE SE VAN A LLAMAR DE LA API
  const limit = 4;
  
  useEffect(()=>{
    axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`).then((res)=>{
      setProducts(res.data.products)
    });
  }, [page]);

  // SE FILTRAN PRODUCTOS
  const filteredProducts = products.filter((p)=> p.title.toLowerCase().includes(search.toLowerCase()));
  
  // CUENTA LA CANTIDAD DE RESULTADO POR BUSQUEDA
  const totalProducts = filteredProducts.length;

  // CALCULA EL PRODUCTO CON EL PRECIO MAS ALTO (MAX)
  const maxProduct = Math.max(...filteredProducts.map((p)=>p.price));
  // CALCULA EL PRODUCTO CON EL PRECIO MAS BAJO (MIN)
  const minProduct = Math.min(...filteredProducts.map((p)=>p.price));

  //  FUNCION AXILIAR PARA EL MODO OSCURO
  const toggleDarkMode = ()=>{
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode")
  };

  // DESCARGA DE REGISTROS
  const handleExport = ()=>{
    const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    triggerDownload(url,"productos.json");
  };

  const triggerDownload = (url, filename) => {
    // DEFINICION DE HIOPERVINCULO
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    // AGREGAMOS HIPERVINCULO AL DOM
    document.body.appendChild(link);
    // SIMULACION DE CLICK
    link.click();
    // ELIMINAR EL ELEMENTO
    document.body.removeChild(link);
  };

  

  return (
    <div ref={containerRef}>
      <h1><strong>ABP Proyecto Integrador</strong></h1>
      <div>
        <button onClick={toggleDarkMode}>Modo {darkMode ? "Claro" : "Oscuro"}</button>
      </div>
      
      <div>
        <input type="text" style={{ backgroundColor: 'white' }} placeholder="Buscar producto" value={search} 
      onChange={(e)=>{setSearch(e.target.value)}} />
      </div>

      <select onChange={(e) => setFormat(e.target.value)} value={format}>
        <option value="">Seleccionar formato</option>
        <option value="json">JSON</option>
      </select>

      <button onClick={handleExport}> Exportar archivo </button>


      <div>
        <ul>
          {filteredProducts.map((p)=> (
            <li key={p.id}>

              <Card title={p.title} price={p.price}/>

            </li>
          ))}
        </ul>

        <button disabled={page === 1} onClick={()=>{setPage(page - 1)}}>Anterior</button>
        <b>Página {page}</b>
        <button onClick={()=>{setPage(page + 1)}}>Siguiente</button>

      </div>
      
      <div>
        <button style={{ backgroundColor: 'green' }} onClick={()=> setShow(!show)}> {show ? "Ocultar" : "Mostrar"} </button>

        {show && <Stats total={totalProducts} max={maxProduct} min={minProduct} />}
      
        {filteredProducts.length === 0 && <div>No se encontraron productos</div>}
      </div>
      

  
    
    </div>
  );
}

export default App;
