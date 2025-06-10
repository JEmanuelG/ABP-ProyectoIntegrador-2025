function Stats({total, max, min}){

    return(

        <div>
            <h2>Estadísticas</h2>
            <p>Total de productos encontrados: {total}</p>
            <p>El producto más caro: ${max}</p>
            <p>El producto más barato: ${min}</p>
        </div>
        
    );
}

export default Stats;