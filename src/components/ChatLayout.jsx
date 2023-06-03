import React, { useState, useEffect, useRef } from 'react'
import { BiSend } from 'react-icons/bi';
import style from './ChatLayout.module.css'
import Chat from './Chat'

const ChatLayout = () => {

  const [chats, setChats] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null);

  useEffect(() => {
    if(chats.length%2){
      fetchAiResponse();
    }
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chats])
  const onSend = () => {
    const msg = input.trim();
    setInput("");
    setLoading(true);
    setChats(prevChats => ([
      ...prevChats,
      {
        role: 'user',
        content: msg
      }
    ]))
  }

  const fetchAiResponse = () => {
    fetch('https://chatai-backend-mszh.onrender.com/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        data: chats
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }else{
          throw new Error('Invalid response');
        }
      })
      .then(res => {
        //successfull response
        setLoading(false);
        const {role, content} = res;
        setChats(prevChats => ([
          ...prevChats,
          {role, content}
        ]))
      })
      .catch(err => {
        setLoading(false);
      })
  }

  return (
    <div className={style.chatLayout}>
      <header className={style.heading}>
        <h1 className={style.title}>ChatAI</h1>
        <p className={style.subtitle}>AI powered Chat App</p>
      </header>
      <section className={style.chatBox}>
        <div className={style.chatContainer}>
          {
            chats.map((chat, index) => (
              <Chat 
                key={index} 
                msg={chat.content} 
                role={chat.role}/>
            ))
          }
          <p ref={scrollRef}></p>
        </div>
        <div className={style.typeBox}>
          <textarea 
            className={style.textInput} 
            rows='1'
            value={input}
            onChange={(e) => setInput(e.target.value)}>
          </textarea>
          <button 
            className={style.sendButton}
            onClick={onSend}
            disabled={loading}>
            <BiSend/>
          </button>
        </div>
      </section>
    </div>
  )
}

export default ChatLayout
