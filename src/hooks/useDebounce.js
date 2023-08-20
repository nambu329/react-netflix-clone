//커스텀 hooks를 만들때는 앞에 use를 붙일 것.
import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        //delay만큼 setTimeout함수를 써서 시간이 지나면 검색어가 완성되도록 함.
        const handler = setTimeout(() => {
          setDebounceValue(value);  
        }, delay);

        //value나 delay가 변경되어 useEffect가 재호출될때 작동하는 return
        return () => {
            clearTimeout(handler);
        };

    }, [value, delay]);

    return debounceValue;
}