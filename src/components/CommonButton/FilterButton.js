import React from 'react'
import FilterSvg from '../SvgIcons/FilterSvg'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const CustomButton = ({onClick,children}) => {
  return (
    <button onClick={onClick} className="filter-btn bg-blue-500 rounded-md py-2 px-7 text-white font-bold">
        {children}
    </button>
  )
}

export default CustomButton