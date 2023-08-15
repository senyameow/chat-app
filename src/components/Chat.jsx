import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '../db/firebase'
import Message from './Message'
const Chat = ({room}) => {
    //нам надо как-то получать и хранить наши смски (будем отправлять их в firebase store) - addDoc
    const [newMessage, setNewMessage] = useState('')
    const [msgs, setMsgs] = useState([])
    const inpEL = useRef()
    const [inpVal, setInpVal] = useState(null)

    // addDoc требует коллекцию! const ... = collection(db, 'collectionName')

    const messageRef = collection(db, 'messages')

    const handleSubmit = async e => {
        e.preventDefault()
        if (newMessage === '') return
        console.log(newMessage)
        //чтобы заюзать addDoc, нам нужно функцию превратить в async (возвращает промис => нужен будет await)
        await addDoc(messageRef, {
            text: newMessage,
            time: serverTimestamp(), // добавит время, когда добавили doc
            user: {name: auth.currentUser.displayName, pfp: auth.currentUser.photoURL, token: auth.currentUser.refreshToken}, // + нам надо знать, кто отправил смску (получаем имя пользователя через auth.currentUser./////)
            room, // и обязательно надо сказать в какой мы руме мурлыкаем (одинаковые переменные - сам поймет, что room: room)
        } ) // говорим ему куда поместить дату, и указываем саму дату, которую помещаем, в дату поместим объект со всеми нужными нам полями
        inpEL.current.value = ''
        setInpVal('')
        
        //всё!! теперь у нас в доках есть объект со всей инфой, которая нам нужна
    }

    //как мы получаем и выводим наши смски?
    //- мы прослушиваем изменения в дб с помощью useEffect

    //чтобы это сделать нам надо импортировать onSnapshot(), который запрашиваем query, который надо создать, но создаем его с определенными условиями (where)

    useEffect(() => {
        const queryMsg = query(messageRef, where('room', '==', room), orderBy('time')) //говорим ему в какой коллекции искать + where (где рума равна нашей руме)
        //к сожалению, если мы не пишем orderBy('...'), то наши смски будут разбросаны по чату в произвольном порядке 
        //но если у нас уже есть where, то он не дает просто так использовать orderBy, надо создавать индекс в файрбазе
        const unsub = onSnapshot(queryMsg, (shot) => { // когда юзаем onSnapshot, нам надо чистить return'ом (присваиваем в переменную и ретёрним в конце юзэффекта)
            let messages = [] //чтобы получить смски, надо обосраться почти
            shot.forEach(doc => {
                messages.push({...doc.data(), id: doc.id}) // проходимся по всем снепшотам, и в смски пихаем объект, в котором наша смска + айдишник надо дописать ей
            }) // когда получили список смсок, теперь надо запихнуть их в обычный стейт 

            setMsgs(messages) // все теперь в нашем стейте есть смски (список из объектов с полями, которые мы задавали в addDoc)
        }) // и говорим ему, братан если в нашем квери, в руме, в которой мы сейчас, происходит какое-то изменение, то ...

        return unsub // ансабнулись
    }, [])

  return (
    <div className='flex justify-center items-center h-[100vh] flex-col'>
        {/* <form onSubmit={handleSubmit} className='flex flex-row gap-3'>
            <input ref={inpEL} type="text" className='border border-black rounded-full px-1' placeholder='new msg...' onChange={e => setNewMessage(e.target.value)} />
            <button className='px-4 py-1 bg-lime-500 rounded-full' type='submit'>send</button>
        </form> */}
        
        <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
		<div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
			{msgs.map(msg => <Message key={msg.id} {...msg} />)}
		</div>
		
		<form onSubmit={(e) => {
            handleSubmit(e)
            setInpVal('')
        }} class="bg-gray-300 p-4">
			<input ref={inpEL} class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" onChange={e => {
                setNewMessage(e.target.value)
                setInpVal(e.target.value)
            }} value={inpVal} />
		</form>
	</div>
    {/* <button onClick={() => console.log(msgs)}>check msgs</button> */}
    </div>
    
  )
}

export default Chat