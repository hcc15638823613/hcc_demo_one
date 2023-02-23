import { useState } from "react"

const useInfo = () => {
    const [userState, setUserState] = useState<{ userName: string, age: number, idCard: 'ADMIN' | 'USER' }>({
        userName: '浩辰', age: 20, idCard: 'ADMIN'
    })
    return {
        userState, setUserState
    }
}
export default useInfo