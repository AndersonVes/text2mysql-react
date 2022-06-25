import React, { useState, useEffect } from 'react'
import Axios from 'axios';

import './normalize.css'
import './App.css'

const App = () => {

    const [storeList, setStoreList] = useState([])

    const GetList = () => {
        Axios.get(`http://localhost:3002/transactions/balances`)
            .then(res => {
                console.log(res.data);
                setStoreList(res.data);
            })
    }

    useEffect(() => {
        GetList()
    }, []);

    if (!storeList) return null;

    let formData = new FormData()

    const onFileChange = (e) => {
        // console.log(e.target.files[0]);
        if (e.target && e.target.files[0]) {
            formData.append('file', e.target.files[0])
        }
    }

    const SubmitFileData = async () => {
        Axios.post(
            'http://localhost:3002/upload',
            formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        )
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))

    }


    return (
        <div className="App">
            <div className='form'>
                <h1>Desafio Dev</h1>
                <div>
                    <input type="file" className="custom-file-input" accept="text/plain" name="file_upload" onChange={onFileChange} />
                </div>
                <div>
                    <button onClick={SubmitFileData}>Enviar</button>
                    <a href="https://github.com/andersonVes/" rel="noreferrer" target="_blank">AndersonVes</a>
                </div>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Loja</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeList.map(d => (<tr key={d.Name}><td>{d.Name}</td><td>{d.Value}</td></tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default App