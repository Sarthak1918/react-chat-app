import React from 'react'

function LoginSubmit({disabled}) {
  return (
<button type='submit' className='px-5 py-3 w-full bg-[#7f12b5] hover:bg-[#600e89]  text-white transition-all' disabled={disabled}>
    Submit
</button>
  )
}

export default LoginSubmit
