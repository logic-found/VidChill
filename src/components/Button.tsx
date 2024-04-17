interface Props {
  title : string
}

const Button = ({title} : Props) => {
  return (
    <div className='h-fit bg-zinc-800 cursor-pointer rounded p-2 hover:bg-zinc-700 text-xs sm:text-base text-center'>{title}</div>
  )
}

export default Button