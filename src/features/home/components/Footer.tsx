import { UserGroup, UserSearch } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-gray-300/40 dark:bg-black/40 border-t-2 border-primary backdrop-blur-md'>
      <article className='max-w-350 mx-auto p-4 flex flex-col lg:flex-row justify-between gap-4 items-center'>
        <section className='flex flex-col items-center gap-2'>
          <h3 className='text-xl font-basicaline font-semibold'>BG Code.</h3>
          <section>
            <ul className='flex gap-4'>
              <a href='https://github.com/BryanGrandon' className='flex gap-2 font-basicaline text-lg' target='_blank'>
                <UserSearch /> Github
              </a>
              <a
                href='https://www.linkedin.com/in/bryan-grandon/'
                className='flex gap-2 font-basicaline text-lg'
                target='_blank'
              >
                <UserGroup /> Linkedin
              </a>
            </ul>
          </section>
        </section>
      </article>
    </footer>
  )
}

export default Footer
