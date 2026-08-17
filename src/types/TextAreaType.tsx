import { ChangeEvent } from "react"

export type TextareaType = {
    name: string
    placeholder: string
    value: string 
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>  void
}