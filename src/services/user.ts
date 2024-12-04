import myAxios from "../plugins/myAxios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // console.log("currentUser", currentUser)
    // if (currentUser) {
    //     return currentUser;
    // }
    //不存在则从远程获取
    const res = await myAxios.get('/user/current');
    // console.log("res1111", res);
    if (res.data.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}
