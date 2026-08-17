import { InputType } from '@/src/types/InputType'

export default function Input(props: InputType) {
  return (
    <div className='flex flex-col gap-0.5 w-sm'>
       <label htmlFor={props.name}>
            {props.name}
        </label>
       <input
       className='py-3 px-2 outline-none bg-mist-800 rounded-md '
       value={props.value}
       name={props.name} 
       type={props.type} 
       placeholder={props.placeholder}
       onChange={props.onChange}
       required
       />
    </div>
  )
}
