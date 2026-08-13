import {Dispatch, SetStateAction, useCallback, useRef} from "react";

function FetchTimeout({setLoading, delay}: {setLoading:Dispatch<SetStateAction<boolean>>, delay:number}) {
    const timerRef = useRef<number| null>(null);


    const start = useCallback(()=>{
        if(timerRef.current)
            window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(()=>{
            console.log("timeout ended");
            setLoading(false);
            timerRef.current = null;
        }, delay);
    }, [setLoading,delay])

    return {start};
}


export default FetchTimeout;