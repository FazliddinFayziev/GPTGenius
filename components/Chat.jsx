'use client';

import { generateChatResponse } from '@/utils/action';
import { useMutation } from '@tanstack/react-query';
import { FaUser } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Chat = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    const { mutate, isPending } = useMutation({
        mutationFn: (query) => generateChatResponse([...messages, query]),
        onSuccess: (data) => {
            if(!data) {
                toast.error('Something went wrong...')
                return;
            }
            setMessages((prev) => [...prev, data]);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = { role: 'user', content: text };
        mutate(query);
        setMessages((prev) => [...prev, query]);
        setText('')
    }

    return (
        <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
            <div className='mt-6'>
                {messages.map(({role, content}, index) => {
                    const avatar = role == 'user' ? (<FaUser size={25} />) : (<RiRobot2Fill size={25} />)
                    return (
                        <div key={index} className={`chat ${role == 'user' ? 'chat-end' : 'chat-start'} -mx-8 px-8`}>
                            <div className="chat-image avatar">
                                <div className="w-10 h-10 rounded-full">
                                    <div className="w-10 h-10 flex justify-center items-center">
                                        {avatar}
                                    </div>
                                </div>
                            </div>
                            <div className={`chat-bubble ${role == 'user' ? 'chat-bubble-primary' : 'chat-bubble-info'}`}>{content}</div>
                        </div>
                    )
                })}
                {isPending ? <span className='loading'></span> : null}
            </div>
            <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
                <div className='join w-full'>
                    <input type="text" placeholder='Message GPTGenius' className='input input-bordered join-item w-full' value={text} required onChange={(e) => setText(e.target.value)} />
                    <button className='btn btn-primary join-item' type='submit' disabled={isPending}>
                        {isPending ? 'please wait...' : 'ask question'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Chat
