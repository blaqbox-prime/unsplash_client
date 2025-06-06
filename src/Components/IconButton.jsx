import React from 'react'

function IconButton({icon, text, onClick, loading = false, disabled = false, className=""}) {
  return (
    <button type="button" className={`flex items-center gap-3 bg-light rounded-md p-3 px-5 font-bold transition-all duration-300 ease-in-out hover:bg-gray-300 ${className}`}
                        onClick={onClick}
                    >
                        {icon}
                        <span>{text}</span>
                    </button>
  )
}

export default IconButton
