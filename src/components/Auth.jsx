import React from 'react'
import { auth, provider } from '../db/firebase' // нам нужно иметь доступ к auth и провайдеру
import { signInWithPopup } from 'firebase/auth' // и тут выбираем метод появления окна (самый норм поп ап окно)
import Cookies from 'universal-cookie' // зачем? куки нужны, чтобы засторить дату даже после ухода со страницы
// например, мы можем что сделать? засторить рефреш токен и его потом юзать + использовать очень легко

const cookie = new Cookies() // создаем новые куки



const Auth = ({setIsAuth}) => {

    const signIn = async () => { // when working with firebase, we are working with async func => use async/await or then/catch 
        try {
            const result = await signInWithPopup(auth, provider) // здесь нам надо получить какую-то информацию пользователя
            cookie.set('auth-token', result.user.refreshToken) // т.к. это асинк, прям тут и сетим наши куки
            setIsAuth(true)
        } catch (error) {
            console.error(error)
        }
        
    }
    //signInWithPopup(auth: Auth, provider: AuthProvider, resolver?: PopupRedirectResolver | undefined): Promise<UserCredential>
    //заметим, что возвращает промис, поэтому надо ждать (await)

    

  return (
    <div className='flex flex-col justify-center items-center'>
        <p className='my-3'>Sign in with Google to continue</p>
        <div className='flex flex-row gap-3'>
        <button className='px-4 py-1 rounded-xl bg-blue-400 text-[1rem] text-white hover:opacity-[.9]' onClick={signIn}>Sign In</button>
        {/* <button className='px-4 py-1 rounded-xl bg-blue-400 text-[1rem] text-white hover:opacity-[.9]' onClick={logOut}>Log Out</button> */}
        </div>
        
    </div>
  )
}

export default Auth