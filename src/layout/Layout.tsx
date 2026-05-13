import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div className={`bg-[url("https://setstream.dev/static/media/placeholder.740c951b.jpg")] overlay bg-cover w-full h-full  min-h-dvh`}>
        <article className='relative min-h-screen grid grid-rows-[auto_1fr_auto]'>
          <Outlet />
        </article>
      </div>
    </>
  )
}

export default Layout
