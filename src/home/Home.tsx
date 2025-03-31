// import {Box} from "@mui/material";
//
//
// const Home = () => {
//     return (
//         <Box sx={{
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             // padding: 1
//         }}>
//             Home Component
//         </Box>
//     );
// };

import './Home.css';
import homeImg from '../imgs/technology.jpg'
import videoFile1 from '../videos/video1.mp4';
import videoFile2 from '../videos/video7.mp4';
import videoFile3 from '../videos/video3.mp4';
import videoFile4 from '../videos/video5.mp4';
import { useRef, useState } from "react";
import {Box} from "@mui/material";

const Home = () => {
    const videoRef1 = useRef<HTMLVideoElement | null>(null);
    const videoRef2 = useRef<HTMLVideoElement | null>(null);
    const videoRef3 = useRef<HTMLVideoElement | null>(null);
    const videoRef4 = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState({
        mainVideo: false,
        video1: false,
        video2: false,
        video3: false,
        video4: false,
    });

    const handleMouseEnter = (videoRef: React.RefObject<HTMLVideoElement | null>, videoName: string) => {
        if (videoRef.current) {
            console.log(`Playing video: ${videoName}`);
            videoRef.current.play();
            setIsPlaying((prevState) => ({ ...prevState, [videoName]: true }));
            increaseSpeed(videoRef);
        }
    };

    const handleMouseLeave = (videoRef: React.RefObject<HTMLVideoElement | null>, videoName: string) => {
        if (videoRef.current) {
            console.log(`Pausing video: ${videoName}`);
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying((prevState) => ({ ...prevState, [videoName]: false }));
            resetSpeed(videoRef);
        }
    };

    const increaseSpeed = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2.0;
        }
    };

    const resetSpeed = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.0;
        }
    };

    return (
        <Box sx={{marginLeft:'20rem'}}>
            {/*<h2 className='home-text'>Welcome to Home Page!</h2>*/}
            {/*<div className='home-video'>*/}
            {/*    <img className='home-image' src={homeImg} alt=""/>*/}
            {/*    <video*/}
            {/*        ref={videoRef1}*/}
            {/*        src={videoFile1}*/}
            {/*        className={`video-top-left video-small ${isPlaying.video1 ? "playing" : ""}`}*/}
            {/*        muted*/}
            {/*        onMouseEnter={() => handleMouseEnter(videoRef1, "video1")}*/}
            {/*        onMouseLeave={() => handleMouseLeave(videoRef1, "video1")}*/}
            {/*    ></video>*/}

            {/*    <video*/}
            {/*        ref={videoRef2}*/}
            {/*        src={videoFile2}*/}
            {/*        className={`video-top-right video-small ${isPlaying.video2 ? "playing" : ""}`}*/}
            {/*        muted*/}
            {/*        onMouseEnter={() => handleMouseEnter(videoRef2, "video2")}*/}
            {/*        onMouseLeave={() => handleMouseLeave(videoRef2, "video2")}*/}
            {/*    ></video>*/}
            {/*    <video*/}
            {/*        ref={videoRef3}*/}
            {/*        src={videoFile3}*/}
            {/*        className={`video-bottom-left video-small ${isPlaying.video3 ? "playing" : ""}`}*/}
            {/*        muted*/}
            {/*        onMouseEnter={() => handleMouseEnter(videoRef3, "video3")}*/}
            {/*        onMouseLeave={() => handleMouseLeave(videoRef3, "video3")}*/}
            {/*    ></video>*/}
            {/*    <video*/}
            {/*        ref={videoRef4}*/}
            {/*        src={videoFile4}*/}
            {/*        className={`video-bottom-right video-small ${isPlaying.video4 ? "playing" : ""}`}*/}
            {/*        muted*/}
            {/*        onMouseEnter={() => handleMouseEnter(videoRef4, "video4")}*/}
            {/*        onMouseLeave={() => handleMouseLeave(videoRef4, "video4")}*/}
            {/*    ></video>*/}
            {/*</div>*/}
            Home component
        </Box>
    );
};

export default Home;