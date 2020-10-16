import React from 'react';
import images from './images';
import Slider from './Slider/slider';
import Navbar from './Slider/Navbar';
export default function Home() {
    return (
        <div>
            <Navbar />
            <Slider slides={images} />
        </div>
    )
}
