import React from 'react'
import FilterSvg from '../SvgIcons/FilterSvg'
import ResetSvg from '../SvgIcons/ResetSvg'


const ResetButton = ({onClick}) => {
  return (
    <button onClick={onClick} className="filter-btn bg-red-500 rounded-md py-2 px-7 text-white font-bold">
        Reset
    </button>
  )
}

export default ResetButton