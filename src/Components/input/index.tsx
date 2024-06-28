import { InputHTMLAttributes } from "react";



interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}// extends das propriedades input props:{CHILDREN} com spread operator...



export function Input(props: InputProps){
    return(
        <input
        className="border-0 h-9 rounded-md outline-none px-2 mb-3"
        {...props}
         />
    )
}