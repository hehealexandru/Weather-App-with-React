// src/TemperatureChart.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TemperatureChart = ({ city, period, data }) => {
    if (!data || data.length === 0) {
        return <p>Nu sunt disponibile date de temperatură pentru {city} ({period}).</p>;
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <h3>Evoluția Temperaturii în {city} ({period})</h3>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    
                    {/* Axa X: Data */}
                    <XAxis 
                        dataKey="name" 
                        stroke="var(--text-color)"
                        style={{ fontSize: '12px' }}
                    />
                    
                    {/* Axa Y: Temperatura */}
                    <YAxis 
                        label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', fill: 'var(--text-color)' }}
                        stroke="var(--text-color)"
                        style={{ fontSize: '12px' }}
                    />
                    
                    {/* Tooltip-ul care apare la hover */}
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--card-bg-color)', border: '1px solid var(--border-color)' }} 
                        formatter={(value) => [`${value}°C`, 'Temperatura']} 
                    />
                    
                    <Legend />
                    
                    {/* Linia pentru Temperatura Maxima/Zilnică */}
                    <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="#007bff" // Albastru
                        name="Temperatura" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                    />
                    
                    {/* Linia pentru Temperatura Resimțită */}
                    <Line 
                        type="monotone" 
                        dataKey="feels_like" 
                        stroke="#28a745" // Verde
                        name="Resimțită" 
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TemperatureChart;
