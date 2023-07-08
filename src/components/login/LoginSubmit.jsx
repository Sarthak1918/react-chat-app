import React from 'react'

function LoginSubmit({disabled}) {
  return (
<button type='submit' className='px-5 py-3 w-full bg-blue-500 hover:bg-blue-900  text-white transition-all' disabled={disabled}>
    Submit
</button>
  )
}

export default LoginSubmit
