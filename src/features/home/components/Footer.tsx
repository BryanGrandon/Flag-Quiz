import IconGithub from '../../../shared/components/icons/IconGithub'
import IconLinkedin from '../../../shared/components/icons/IconLinkedin'

const Footer = () => {
  return (
    <footer className='bg-gray-300/40 dark:bg-black/40 border-t-2 border-primary backdrop-blur-md'>
      <article className='max-w-350 mx-auto p-4 flex flex-col lg:flex-row justify-between gap-4 items-center'>
        <section className='flex flex-col gap-2'>
          <h3 className='text-xl font-basicaline font-semibold'>BG Code.</h3>
          <section>
            <ul className='flex gap-4'>
              <a href='https://github.com/BryanGrandon' className='flex gap-2 font-basicaline text-lg' target='_blank'>
                <IconGithub /> Github
              </a>
              <a href='https://www.linkedin.com/in/bryan-grandon/' className='flex gap-2 font-basicaline text-lg' target='_blank'>
                <IconLinkedin /> Linkedin
              </a>
            </ul>
          </section>
        </section>

        <section>
          <h3 className='text-xl font-basicaline font-semibold'>Attribution</h3>
          <ul className='list-disc list-inside'>
            <li>
              Vectors and icons by vscode-icons in MIT License via{' '}
              <a href='https://svgowl.com/' target='_blank' className='text-primary underline'>
                SVG OWL
              </a>
            </li>
          </ul>
        </section>
      </article>
    </footer>
  )
}

export default Footer
