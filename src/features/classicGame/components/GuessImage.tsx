type GuessImageProps = {
  image: {
    svg: string
    alt: string
  }
}

const GuessImage = ({ image }: GuessImageProps) => {
  const { svg, alt } = image
  return (
    <picture className='w-80 lg:w-120 h-40 lg:h-70 overflow-hidden rounded-xl mx-auto'>
      <img src={svg} alt={alt} className='object-contain lg:object-cover object-center w-full h-full rounded-lg' />
    </picture>
  )
}

export default GuessImage
