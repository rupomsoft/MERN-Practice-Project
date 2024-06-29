import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";

const ScreenRecorderPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [videoBlob, setVideoBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
    });

    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoBlob(blob);
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
    <Container className="mt-3">
      <Button
        variant="primary"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      {!videoURL && isRecording && (
        <h1 variant="h6">Recording Time: {formatTime(recordingTime)}</h1>
      )}
      {videoURL && (
        <>
          <div className="video-container">
            <video ref={videoRef} controls className="recorded-video">
              <source src={videoURL} type="video/webm" />
            </video>
            <div className="overlay">
              <h1 variant="h6" className="overlay-text">
                Recording Time: {formatTime(recordingTime)}
              </h1>
            </div>
          </div>
          <Button variant="secondary" onClick={downloadVideo}>
            Download Video
          </Button>
        </>
      )}
    </Container>
  );
};

export default ScreenRecorderPage;
