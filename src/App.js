import Axios from 'axios';

import './normalize.css'
import './App.css'

const App = () => {

    let formData = new FormData()

    const onFileChange = (e) => {
        // console.log(e.target.files[0]);
        if (e.target && e.target.files[0]) {
            formData.append('file', e.target.files[0])
        }
    }

    const SubmitFileData = () => {
        Axios.post(
            'http://localhost:3002/upload',
            formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        )
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="App">
            <h1>Desafio Dev</h1>
            <div>
                <input type="file" className="custom-file-input" accept="text/plain" name="file_upload" onChange={onFileChange} />
            </div>
            <div>
                <button onClick={SubmitFileData}>Enviar</button>
                <p>AndersonVes</p>
            </div>
        </div>
    )
}

export default App