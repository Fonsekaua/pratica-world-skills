import { ChangeEvent } from "react"

export type InputType = {
    name: string
    type: 'text' | 'email' | 'password'
    placeholder: string
    value: string 
    onChange: (e: ChangeEvent<HTMLInputElement>) =>  void
}