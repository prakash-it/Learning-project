import React from 'react'

export default function Button({styles}) {
  return (
    <div className='mt-10'>
    <button type='button' className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none ${styles} rounded-[10px]`}>
      Get Started       
    </button>
    </div>
  )
}
