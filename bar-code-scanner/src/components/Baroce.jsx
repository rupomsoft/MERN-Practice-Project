import React, { useState } from "react";
import BarcodeReader from "react-barcode-reader";

const Barcode = () => {
  const [result, setResult] = useState("No result");

  const handleScan = (data) => {
    setResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <BarcodeReader onError={handleError} onScan={handleScan} />
      <p>{result}</p>
    </div>
  );
};

export default Barcode;
