import {useEffect} from 'react'

const useOnClickOutside = (ref, handler) => {
 
    useEffect(() => {
        const listener = (event) => {
            console.log('ref :: ', ref.current);

            //클릭이 모달창 안인 경우
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }
            //모달 외의 부분을 클릭, 터치시 handler 호출
            handler();
        };    
        //클릭, 터치 이벤트가 발생할때 이벤트 리스터 등록
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchStart", listener);
        //컴포넌트가 unmount될시 return 작동
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchStart", listener);
        }
    }, [ref, handler]);
}

export default useOnClickOutside;