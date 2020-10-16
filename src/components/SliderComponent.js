import React, {useState} from 'react';
import '../styles/slider.sass'
import ImgComponent from './ImageComponent';
import image1 from "../images/1.jpg"
import image2 from "../images/2.jpg"
import image3 from "../images/3.jpg"
import image4 from "../images/4.jpg"
import image5 from "../images/5.jpg"


function Slider() {
    let sliderArr = [
        <ImgComponent src={image1} />, 
        <ImgComponent src={image2} />, 
        <ImgComponent src={image3} />,
        <ImgComponent src={image4} />,
        <ImgComponent src={image5} />
    ]
    const [x, setX] = useState(0)
    const showPrev = () => {
        x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
    }
    const showNext = () => {
        x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
    }

    return (
        <div className="slider">
        {
            sliderArr.map((item, index) => {
                return (
                    <div key={index} className="slide" style={{transform: `translateX(${x}%)`}}>
                        {item}
                    </div>
                )
            })
        }
        <button id="prev" onClick={showPrev}>
            <i className="fas fa-chevron-left"></i>
        </button>
        <button id="next" onClick={showNext}>
            <i className="fas fa-chevron-right"></i>
        </button>
        </div>
    )
}

export default Slider;