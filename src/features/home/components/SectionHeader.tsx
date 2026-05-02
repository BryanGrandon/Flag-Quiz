const SectionHeader = ({ title }: { title: string }) => {
  return (
    <section className='flex gap-2 items-center'>
      <h3 className='text-lg font-basicaline min-w-fit text-gray-400 tracking-wide'>{title}</h3>
      <span className='h-px rounded-xl w-full bg-gray-400 my-2'></span>
    </section>
  )
}

export default SectionHeader
