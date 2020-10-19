import React, {useState, useEffect} from 'react';
import '../styles/slider.sass'
import ImgComponent from './ImageComponent';
import image1 from "../images/1.jpg"
import image2 from "../images/2.jpg"
import image3 from "../images/3.jpg"
import image4 from "../images/4.jpg"
import image5 from "../images/5.jpg"


function Slider(props) {
    
    let sliderArr = [
        <ImgComponent src={image1} />, 
        <ImgComponent src={image2} />, 
        <ImgComponent src={image3} />,
        <ImgComponent src={image4} />,
        <ImgComponent src={image5} />,
        <div id="example">
            <p>This is a test to show that it works for any kind of content</p>
            <button>Example</button>
            <textarea defaultValue="Example"></textarea>
        </div>
    ]
    let buttons = []
    const buttonlist = (i) => {
        for (let i = 1; i <= sliderArr.length; i++) {
        buttons.push(<button className="navigation" key={i} onClick={(e) => {e = parseInt(e.target.innerHTML); moveTo(e)}}>{i}</button>);
          }
          return buttons;
    }
    const [x, setX] = useState(0)
    const [direction, setDirection] = useState('')
    const [swiped, setSwiped] = useState(false)
    useEffect(() => {
        if(swiped === true) 
        {
            if(direction === 'right to left') 
            {
                document.getElementById('next').click(); 
                setSwiped(false);
            } else {
                document.getElementById('prev').click(); 
                setSwiped(false);
            }
        }
    })
    let _swipe = {}
    const minDistance = 50

    const _onTouchStart = (e) => {
        const touch = e.touches[0];
        _swipe = { x: touch.clientX };
        setSwiped(false);
      }
    
      const _onTouchMove = (e) => {
        if (e.changedTouches && e.changedTouches.length) {
          _swipe.swiping = true;
        }
      }
    
      const _onTouchEnd = (e) => {
        const touch = e.changedTouches[0];
        const swipeLength = touch.clientX - _swipe.x;
        if (swipeLength < 0) {setDirection('right to left')} else {setDirection('left to right')}
        if (_swipe.swiping && Math.abs(swipeLength) > minDistance ) {
          props.onSwiped && props.onSwiped();
          setSwiped(true)
        }
        _swipe = {};
      }


    const showPrev = () => {
        x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
    }
    const showNext = () => {
        x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
    }
    const moveTo = (e) => {
        setX(-100*(e-1));
    }



    return (
        <div className="slider">        
            <div id="outer">
                {buttonlist(1)}
            </div>        
        {
            sliderArr.map((item, index) => {
                return (
                    <div key={index} 
                    onTouchStart={_onTouchStart}
                    onTouchMove={_onTouchMove}
                    onTouchEnd={_onTouchEnd}
                    className="slide" style={{transform: `translateX(${x}%)`}}>
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