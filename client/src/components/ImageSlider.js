import React, {useState} from 'react'
//import {SliderData} from './SliderData';
import Panel from './Panel';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'
const ImageSlider = ({ sliderData }) => {
    const [current, setCurrent] = useState(0)
    const length = sliderData.length;

    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
      setCurrent(current === 0?  length - 1 : current - 1)
    }

  if(!Array.isArray(sliderData) || sliderData.length <= 0) {
    return <div>e </div>;
  }

  //console.log(sliderData);

  return (
    <section className = "slider">
        <FaArrowAltCircleLeft className = "left-arrow" onClick = {prevSlide}/>
        <FaArrowAltCircleRight className = "right-arrow" onClick = {nextSlide}/>
        
        {sliderData.map((slide, index) => {
            return (
              <div className = {index === current ? 'slide active' : 'slide'} key = {index}>
                {index === current && (
                  <div>
                    {/* <img src={slide.image} alt = "travel image" className = "image"/> */}
                    <Panel content = {slide}/>
                  </div>
                )}

              </div>
            )
        })}
    </section>
  )
}

export default ImageSlider
