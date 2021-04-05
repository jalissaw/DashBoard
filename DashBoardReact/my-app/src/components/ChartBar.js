import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';


const ChartBar = ({ data, symbol, peerData, weekAgo, today }) => {

    let dateArr = [];
    let volumeArr = [];
    let volumeArr2 = [];


    const date = data.data.map(({ date, volume }) => {
        const newDate = date.slice(0, 10);
        const dataForBar = {
            volume: Number(volume),
            date: newDate
        }

        dateArr.push(dataForBar.date);
        volumeArr.push(dataForBar.volume);
        return dataForBar
    })

    const [getPeer, setGetPeer] = useState('');
    const [selectData, setSelectedData] = useState([]);

    const handleChange = (peer) => {
        setGetPeer(peer)
        fetch(`http://api.marketstack.com/v1/eod?access_key=72d118ca9db1873033447561590e2794&symbols=${peer}&date_from=${weekAgo}&date_to=${today}`)
            .then(res => {
                return res.json();
            }).then(data => {
                setSelectedData(data);
            }).catch(err => {
                console.log(err)
            });
    }

    const selectedData = selectData.data && selectData.data.map(({ volume }) => {
        const dataForBar2 = {
            volume: Number(volume),
        }
        volumeArr2.push(dataForBar2.volume);
        return dataForBar2
    })



    return (
        <div className='chart' style={{ height: '300px' }}>
            <>
                <select name='peer' onChange={(e) => handleChange(e.target.value)}>
                    {peerData.map(peer => {
                        return <option key={peer} value={peer}>{peer}</option>
                    })}
                </select>
            </>
            <Line
                data={{

                    labels: [...dateArr],
                    datasets: [{
                        label: `Volume for ${symbol.toUpperCase()}`,
                        data: [...volumeArr],
                        backgroundColor: [
                            'rgba(71, 71, 226, 0.5)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 2,
                    },
                    {
                        label: `Volume For ${getPeer}`,
                        data: [...volumeArr2],
                        backgroundColor: [
                            'rgba(255, 71, 120, 0.8)',
                            'rgba(160, 78, 50, 0.8)',
                            'rgba(145, 78, 62, 0.8)',
                            'rgba(210, 5, 10, 0.8)',
                            'rgba(245, 78, 45, 0.8)',
                            'rgba(100, 100, 2, 0.8)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(152, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(152, 102, 255, 1)',
                            'rgba(152, 159, 64, 1)'
                        ],
                        borderWidth: 2,
                    }

                    ]

                }}
                width={50}
                height={50}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    color: '#a3a3f0',
                    legend: {
                        display: true,
                        labels: {
                            fontColor: '#a3a3f0',
                            fillStyle: 'rgb(0, 0, 25)',
                            padding: 10
                        }
                    },

                    layout: {
                        padding: {
                            left: 30,
                            right: 60,
                            top: 0,
                            bottom: 65
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontColor: '#a3a3f0',
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: '#a3a3f0',
                            },
                        }]
                    }
                }
                } />
        </div>
    );
}

export default ChartBar;