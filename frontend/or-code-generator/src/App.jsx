import {useState} from "react";
import {Navbar} from "react-bootstrap";
import navLogo from "./assets/images/logo.png";
import QRCode from "qrcode.react";

const App = () => {

    const [input, setInput] = useState("hello");

    const downloadImage = async () => {
        const canvas = document.querySelector("canvas");
        const imageDataURI = canvas.toDataURL("png", 1.0);
        const blob = await (await fetch(imageDataURI)).blob();
        const URL = window.URL.createObjectURL(blob);
        const el = document.createElement("a");
        el.href = URL;
        el.download = "myqrcode.png";
        el.click();
        window.URL.revokeObjectURL(URL);
    };



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
                    <h3 className="font-weight-bolder">QR Code Generator</h3>
                    <hr/>
                    <input
                        type="url"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="form-control"
                        placeholder="Write something to generate qr code"
                    />

                    {input && (
                        <>
                            <section>
                                <QRCode
                                    value={input}
                                    size={200}
                                    level="M"
                                    className="mt-4 mb-3"
                                />
                            </section>
                            <button className="btn mt-4  btn-dark" onClick={downloadImage}>Download QR</button>
                        </>
                    )}
                </div>
            </div>
        </div>


    </>
  );
};

export default App;
