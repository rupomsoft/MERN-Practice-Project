import React, {useEffect, useRef, useState} from "react";
import {Navbar} from "react-bootstrap";
import navLogo from "./assets/images/logo.png";

const App = () => {

    const [isRecording, setIsRecording] = useState(false);
    const [videoURL, setVideoURL] = useState("");
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);
    const intervalRef = useRef(null);


    const startRecording = async () => {

        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" },
        });


        const chunks = [];
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };


        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            setVideoURL(URL.createObjectURL(blob));
            clearInterval(intervalRef.current);
        };


        mediaRecorderRef.current.start();
        setIsRecording(true);
        setRecordingTime(0);
        intervalRef.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1);
        }, 1000);
    };


    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };



    const downloadVideo = () => {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = videoURL;
        a.download = "recorded-video.webm";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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

        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <button className="btn btn-dark" onClick={isRecording ? stopRecording : startRecording}>
                        {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>

                    {!videoURL && isRecording && (
                        <h6 className="mt-4">Recording Time: {formatTime(recordingTime)}</h6>)}

                    {videoURL && (
                        <>
                            <div className="video-container">
                                <video ref={videoRef} controls className="recorded-video">
                                    <source src={videoURL} type="video/webm"/>
                                </video>
                                <div className="overlay">
                                    <h1 className="overlay-text">
                                        Recording Time: {formatTime(recordingTime)}
                                    </h1>
                                </div>
                            </div>
                            <button className="btn mt-3 btn-dark" onClick={downloadVideo}>
                                Download Video
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
  );
};

export default App;
