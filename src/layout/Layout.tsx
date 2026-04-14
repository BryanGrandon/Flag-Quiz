import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div className='outlet'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
