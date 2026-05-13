import { Outlet } from 'react-router-dom'

const Games = () => {
  return (
    <>
      <div
        className={`bg-[url("https://static.vecteezy.com/system/resources/previews/001/436/744/original/modern-background-with-black-and-red-lines-free-vector.jpg")] overlay bg-cover w-full h-full  min-h-dvh`}
      >
        <article className='relative'>
          <Outlet />
        </article>
      </div>
    </>
  )
}

export default Games
