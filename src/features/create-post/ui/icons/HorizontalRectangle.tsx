import React from 'react'

type HorizontalRectangleProps = {
  color?: string
}

const HorizontalRectangle: React.FC<HorizontalRectangleProps> = ({ color = '#8D9094' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 20" fill="none">
      <rect x="25" y="1" width="18" height="24" rx="2" transform="rotate(90 25 1)" stroke={color} />
    </svg>
  )
}

export default HorizontalRectangle