export const profileCreationInfo = (user)=>{
    return{
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        image: user.picture,
    }
}