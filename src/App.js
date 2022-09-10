import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as mobileNet from '@tensorflow-models/mobilenet'
import * as tfjs from '@tensorflow/tfjs'
function App() {
  const[data,setData] = useState(null);
  const [dataModel,setDataModel] = useState(null);
  const [predi,setPredi] = useState([]);
  const reference = useRef();

  const handlePic = (e) => {
    setData(e.target.value)
  }
  const modelLoad = async() => {
      try {
        const model = await mobileNet.load();
        setDataModel(model);
      } catch (error) {
        console.log(error)
      }
  }

  const handlePrediction =async () => {
    const prediction = await dataModel.classify(reference.current)
    console.log(prediction)
    setPredi(prediction)
  }
  useEffect(()=>{
    modelLoad();
  },[])
  console.log(data)

  return (
    <div className="App">
      <div className='header'>
          <h1 className='container'>Image Guesser</h1>
      </div>
      <div className='container'>

  <div className="input-group mb-3 inputTag">
  <input type="text" onChange={(e) => handlePic(e)} className="form-control" id="exampleFormControlInput1" placeholder=""/>
  <div className="input-group-append">
    <button onClick={handlePrediction} className="btn btn-outline-secondary text-light"style={{backgroundColor: "#000080"}} type="button" id="button-addon2">Predict</button>
  </div>
</div>
<div className='content'>
    <>
    <img alt='...' className='imgg' src={data} crossOrigin="anonymous" ref={reference}/>
</>
    <div className='pred'>
      <h1>Predictions</h1>
    {data && predi.map((pred,index) => (
      <div className='card predCard' key={index}>
        <div className='card-header'style={{backgroundColor: "#000080"}}></div>
        <div className='card-body'>
        <h6>Name : {pred.className}</h6>
        <h6>Probability : {(pred.probability*100)}</h6>
        </div>
    </div>
    ))}
    </div>

</div>
    </div>
    </div>
  );
}

export default App;
