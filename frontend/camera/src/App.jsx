import {Navbar} from "react-bootstrap";
import navLogo from "./assets/images/logo.png";
import Webcam from "react-webcam";
import  {useRef, useState} from "react";


const App = () => {

    const videoConstraints = {width: 540, facingMode: "environment",};
    const webcamRef = useRef(null);
    const [url,setUrl] = useState(null);

    const  capturePhoto= ()=>{
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
    }


  return (
    <>
        <Navbar className="sticky-top nav" bg="light">
            <div className="container">
                <Navbar.Brand>
                    <img className="nav-logo" src={navLogo} alt="" />
                </Navbar.Brand>
            </div>
        </Navbar>


        <div className="container">
            <div className=" row py-5">
                <div className="col-md-6 offset-md-3">
                    <h3>Webcam Camera</h3>
                    <hr />

                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />

                    <button onClick={capturePhoto} className="btn btn-dark mr-2">Capture</button>
                    <button className="btn btn-dark mr-2" onClick={() => setUrl(null)}>Refresh</button>

                    {url && (
                        <div className="my-3">
                            <img src={url} alt="photo" />
                        </div>
                    )}
                </div>
            </div>
        </div>

    </>
  );
};

export default App;
