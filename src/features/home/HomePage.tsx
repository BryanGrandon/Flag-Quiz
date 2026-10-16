import Footer from './components/Footer'
import GameCategories from './components/GameCategories'

const HomePage = () => {
  return (
    <>
      <header className='p-4 max-w-300 mx-auto flex flex-col gap-2 min-h-30 items-center justify-center'>
        <h1 className='font-basicaline text-4xl'>Flag Quiz</h1>
        <p className=''>Test your knowledge of flags from around the world!</p>
      </header>
      <main className='p-4 max-w-300 mx-auto pb-20'>
        <GameCategories />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
