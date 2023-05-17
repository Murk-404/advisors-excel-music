import './icon.css'
import { useState } from 'react'
interface Props {
  fill: string;
  stroke: string;
}



export default function HeartIcon({fill, stroke}: Props) {
  
  const [isFilled, setIsFilled] = useState(false)
  
  return (
    <svg id="Layer_2" data-name="Layer 2" viewBox="-10 -30 150 150" style={{width: '25px', height: '25px', filter: 'var(--shadow2)', cursor: 'pointer', margin: '5px'}} onClick={() => {setIsFilled(!isFilled)}}>
      <g id="Layer_1-2" data-name="Layer 1" style={(isFilled) ? {fill: `${fill}`} : {}} stroke={stroke} strokeWidth={'6px'}>
        <path className="cls-1" d="M54.84,20.2c-2.46-2.5-8.38-7.66-10.91-10.19C35.14,1.21,21.1,.64,11.71,8.61,2.11,16.76-.18,31.33,8,40.84c15.05,17.51,30.92,34.33,46.84,51.87,15.93-17.55,31.79-34.37,46.84-51.87,8.18-9.51,5.89-24.07-3.71-32.23-9.39-7.98-23.43-7.4-32.23,1.4-2.53,2.53-8.46,7.7-10.91,10.19Z"/>
      </g>
    </svg>
  )
}
