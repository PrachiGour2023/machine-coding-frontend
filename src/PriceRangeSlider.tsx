import React, { useState } from 'react'

let MIN = 0, MAX = 10000, STEP = 100;

const PriceRangeSlider = () => {

  const [minValue, setMinValue] = useState(1000);
  const [maxValue, setMaxValue] = useState(8000);

  const handleMinValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxValue) {
      setMinValue(value)
    }
  }

  const handleMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minValue) {
      setMaxValue(value)
    }
  }

  const getPercent = (value: number) => {
    return (value - MIN) / (MAX - MIN) * 100
  }

  const minPercent = getPercent(minValue);
  const maxPercent = getPercent(maxValue);


  return (
    <div className='container'>
      <h3>Price Range</h3>

      <div className='input-container'>
        <label>Min Price:
          <input
            type="number"
            min={MIN}
            max={MAX}
            step={STEP}
            value={minValue}
            onChange={handleMinValue}
          />
        </label>

        <label>
          Max Price:
          <input
            type='number'
            min={MIN}
            max={MAX}
            step={STEP}
            value={maxValue}
            onChange={handleMaxValue}
          />
        </label>
      </div>

      <div className='values-display'>
        <span>₹{minValue}</span>
        <span>₹{maxValue}</span>
      </div>

      <div className='slider-wrapper'>
        <div className='slider-track' />
        <div
          className='slider-range-fill'
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={minValue}
          onChange={handleMinValue}
          className='thumb thumb-min'
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={maxValue}
          onChange={handleMaxValue}
          className='thumb thumb-max'
        />
      </div>
    </div>
  )
}

export default PriceRangeSlider