import { TextareaType } from "@/src/types/TextAreaType";


export default function TextArea(props: TextareaType) {
    return (
        <div className='flex flex-col gap-0.5 w-sm'>
            <label htmlFor={props.name}>
                {props.name}
            </label>
            <textarea
            
                className='py-3 px-2 outline-none  bg-mist-800 rounded-md min-h-20 max-h-32'
                value={props.value}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                required
            ></textarea>
        </div>
    )
}

