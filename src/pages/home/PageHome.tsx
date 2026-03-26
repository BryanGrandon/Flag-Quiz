const PageHome = () => {
  return (
    <>
      <header className='test p-4 max-w-350 mx-auto'>
        <h1 className='font-basicaline text-4xl text-center'>Flag Quiz</h1>
        <p></p>
      </header>
      <main className='test p-4 max-w-350 mx-auto '>
        <article>
          <h2 className='font-basicaline text-3xl py-4'>Game Modes</h2>
          <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
            <section className='rounded-xl p-6 shadow-lg w-full test'>
              <h3 className='text-2xl font-bold mb-3'>Guess the Country</h3>
              <p className='text-gray-400 mb-4'>Guess the country from its flag. Choose or type your answer.</p>
              <section className='mb-6 space-y-2'>
                <h3>Game Options</h3>
                <section className='pl-4'>
                  <button className='flex items-center gap-2 p-1'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                    Multiple choice mode
                  </button>
                  <button className='flex items-center gap-2 p-1'>
                    <span className='w-2 h-2 bg-gray-600 rounded-full'></span>
                    Write answer mode
                  </button>
                </section>
              </section>
              <div className='grid grid-cols-2 gap-3'>
                <button className='border border-gray-600 py-2 rounded-lg hover:bg-gray-700 transition'>How to Play</button>
                <button className='bg-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-500 transition'>Start Quiz</button>
              </div>
            </section>

            <section className='test'>
              <h3 className='font-basicaline text-2xl'>Guess the Capital</h3>
              <p>Identify the capital city based on its flag!</p>
              <button>Start Quiz</button>
              <p>How to play: </p>
            </section>
          </article>
        </article>
      </main>
    </>
  )
}

export default PageHome
