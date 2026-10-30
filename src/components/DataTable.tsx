import React from 'react'

const sampleData = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
    { id: 4, name: "David", age: 28 },
    { id: 5, name: "Eve", age: 27 },
    { id: 6, name: "Frank", age: 33 },
    { id: 7, name: "Grace", age: 24 },
    { id: 8, name: "Hank", age: 26 },
    { id: 9, name: "Ivy", age: 21 },
    { id: 10, name: "Jack", age: 29 }
];

const DataTable = () => {


    const header = sampleData.length > 0 ? Object.keys(sampleData[0]) : [];
    
    return (
        <div>
            <h2>Data Table</h2>
            <div>
                <table border={"1"} cellPadding={'10'} style={{
                    width: '100%', borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr>
                            {
                                header.map((key) => {
                                    return (
                                        <th key={key}>{key.toUpperCase()}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                sampleData.map((row, id) => {
                                    return (
                                        <tr key={id}>
                                       {header.map(key => {
                                        return (
                                            <td key={key}>{row[key]}</td>
                                        )
                                       })}
                                       </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DataTable