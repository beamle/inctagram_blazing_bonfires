import React from 'react'

type VerticalRectangleProps = {
  color?: string
}

const VerticalRectangle: React.FC<VerticalRectangleProps> = ({ color = '#8D9094' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="26" viewBox="0 0 18 26" fill="none">
      <rect x="1" y="1" width="16" height="24" rx="2" stroke={color} />
    </svg>
  )
}

export default VerticalRectangle