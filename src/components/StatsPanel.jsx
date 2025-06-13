
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Stats({total, max, min}){
    const data = {
        labels: ['Precio Mínimo', 'Precio Máximo'],
        datasets: [
            {
                label: 'Precios',
                data: [min, max],
                backgroundColor: ['blue', 'orange'],
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Estadísticas de Precios',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    
    return(

        <div>
            <h2>Estadísticas</h2>
            <p>Total de productos encontrados: {total}</p>
            <p>El producto más caro: ${max}</p>
            <p>El producto más barato: ${min}</p>

            <div style={{ maxWidth: '600px', margin: 'auto' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
        
    );
};

export default Stats;