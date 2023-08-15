import React, { useState, useRef } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie/cjs/Cookies";
import Chat from "./components/Chat";
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth } from "./db/firebase";

const cookies = new Cookies()

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token')) // т.к. у нас есть куки, мы не должны протсо писать, что инитиал стейт = false, нам надо посмотреть в куки
  //чтобы посмотреть импортируем наши куки и засовываем в переменную
  //если токен в куках есть, то в стейте будет этот токен, если нет, то будет пустая строка, что выдаст false при проверке
  // т.к. любая строка - true, то самая простая проверка будет if (isAuth) {}

  //нам надо передавать setAuth в Auth и там заюзать его, иначе придется рефрешить страницу))) чтобы ререндерить App

  const [room, setRoom] = useState(null) // чтобы законектиться к чату, надо будет ввести название этого чата, которое мы будем давать юзеру возможность задавать

  const roomInpRef = useRef()

  const logOut = async () => {
    try {
        await signOut(auth)
        cookies.remove('auth-token')
        setIsAuth(false)
        setRoom(null)
    } catch (error) {
        console.error(error)
    }
}
  
  if (!isAuth) {
    return (
      <div className="App flex justify-center items-center h-[100vh]">
        <Auth setIsAuth={setIsAuth}/> 
        {/* <button onClick={() => console.log(isAuth)}>check auth</button> */}
      </div>
    );
  }

  return (
    <div>
      {room ? <Chat room={room} /> : 
      (<div className="flex justify-center items-center h-[100vh] flex-col">
        <div className="flex flex-col justify-center items-center gap-3">
          <label htmlFor="">Enter roon name:</label>
          <input className="border border-black rounded-xl px-1" type="text" ref={roomInpRef} />
          <button className="inline-block px-4 py-1 bg-amber-400 text-white rounded-xl" onClick={() => setRoom(roomInpRef.current.value)}>enter</button>
        </div>
      </div>)}
      <button onClick={logOut} className="px-4 py-1 rounded-xl bg-blue-400 text-[1rem] text-white hover:opacity-[.9]">log out</button>
    </div>
  )
  
}

export default App;
