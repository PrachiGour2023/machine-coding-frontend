import { useState } from 'react';

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

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPageItem, setPerPageItem] = useState<number>(5);
    const header = sampleData.length > 0 ? Object.keys(sampleData[0]) : [];
    const start = (currentPage - 1) * perPageItem;
    const end = start + perPageItem;
    const totalPage = Math.ceil(sampleData.length / perPageItem)
    
    return (
        <div style={{
            margin: '20px'
        }}>
            <h2>Data Table</h2>
            <div>
                <table border={1} cellPadding={'10'} style={{
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
                            sampleData.slice(start, end).map((row: any, id) => {
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
            <div className='pagination-container'>
                <div className='flex-box'>
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                    <span>Page {currentPage} of {totalPage}</span>
                    <button disabled={currentPage === totalPage} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                </div>
                <div className='flex-box'>
                    <span>Rows per page: </span>
                    <select onChange={(e) => {
                        setPerPageItem(Number(e.target.value))
                        setCurrentPage(1)
                    }}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DataTable