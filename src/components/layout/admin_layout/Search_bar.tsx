
import React, {CSSProperties, SetStateAction} from "react";


type prep = {
    value?:string,
    onValueChange: React.Dispatch<SetStateAction<string>>,
    placeHolder?: string,
    max_width?:string,
    additional_params?:CSSProperties
}

export default function Admin_SearchBar ({value, onValueChange, placeHolder, max_width="400px", additional_params}:prep) {

    return (
        //50% width
        <div style={{
            maxWidth:max_width,

            ...(additional_params ?? {})
        }} className="w-full">
            <div className="relative  flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray"
                     className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                    <path fillRule="evenodd"
                          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                          clipRule="evenodd"/>
                </svg>

                <input
                    value={value}
                    onChange={(e) => onValueChange(e.target.value ?? "")}

                    className={`w-full bg-white placeholder:text-gray-400 text-black text-sm border
            border-gray-200 rounded-md pl-10 pr-3 py-2
            transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300
            shadow-sm focus:shadow `}
                    //Placeholder text
                       placeholder={placeHolder}
                />
            </div>

            <span></span>
        </div>
    )
}