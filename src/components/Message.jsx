import React from 'react'
import Cookies from "universal-cookie/cjs/Cookies";

const cookies = new Cookies()

const Message = ({id, room, text, time, user}) => {

    if (!(cookies.get('auth-token') === user.token)) {
        return (
            <div class="flex w-full mt-2 space-x-3 max-w-xs">
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
            <img className='rounded-full' src={user.pfp} alt="" />
        </div>
        <div>
            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm">{text}</p>
            </div>
            {/* <span class="text-xs text-gray-500 leading-none">{Math.round((Date.now() - time.toMillis()) / 60000)} min ago</span> */}
        </div>
        </div>
        )
      } else {
        return (
            <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                
            <div>
                <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p class="text-sm">{text}</p>
                </div>
                {/* <span class="text-xs text-gray-500 leading-none">{Math.round((Date.now() - time.toMillis()) / 60000)} min ago</span> */}
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                <img className='rounded-full' src={user.pfp} alt="" />
            </div>
        </div> 
        )
      }

    } 
export default Message

