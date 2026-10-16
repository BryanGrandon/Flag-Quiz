import type React from 'react'

type SectionGameCategoryProps = {
  label: string
  children: React.ReactNode
}

const SectionGameCategory = ({ label, children }: SectionGameCategoryProps) => {
  return (
    <section className='flex flex-col gap-3'>
      <div className='flex gap-2 items-center'>
        <h3 className='text-lg font-basicaline min-w-fit text-gray-300 tracking-wide'>{label}</h3>
        <span className='h-px rounded-xl w-full bg-gray-300 my-2'></span>
      </div>
      <div className='px-3'>{children}</div>
    </section>
  )
}

export default SectionGameCategory
