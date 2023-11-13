import { useEffect, useMemo, useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { MdArrowDropDown } from 'react-icons/md'

function App() {

  const date = new Date();
  const [messages, setMessages] = useState([
    {
      sender: 'Ric',
      day: '10',
      month: '11',
      year: '2023',
      hours: '12',
      minutes: '39',
      text: 'Hello! How are you?'
    },
    {
      sender: 'Fazers',
      day: '10',
      month: '11',
      year: '2023',
      hours: '12',
      minutes: '45',
      text: 'yeah idk'
    },
  ]);
  const [currentUser, setCurrentUser] = useState();
  const [receiver, setReceiver] = useState();
  const textRef = useRef();
  const [showLogin, setShowLogin] = useState(false);
  const contacts = ['Ric', 'Fazers'];
  const [select, setSelect] = useState('Ric');

  useEffect(() => {
    localStorage.setItem('Messages', JSON.stringify(messages));
  }, [messages]);

  useMemo(() => {
    const savedMessages = JSON.parse(localStorage.getItem('Messages'));
    if (savedMessages) setMessages(savedMessages);
  }, []);

  function MessagesLoader() {
    return (
      messages.map((message, index) => (
        <div className='message_body' key={index}>
          <div className="message_body_date">
            {index == 0 ? <p>{message.day + '/' + message.month + '/' + message.year}</p> : (messages[index - 1].day == message.day && messages[index - 1].month == message.month && messages[index - 1].year == message.year) ? <></> : <p>{message.day + '/' + message.month + '/' + message.year}</p>}
          </div>
          <div className={`message ${message.sender == currentUser ? 'message_currentUser' : ''}`} >
            {index == 0 ? <p className='message_header'>{message.sender} - {message.hours}:{message.minutes}</p> : message.sender == messages[index - 1].sender ? <></> : <p className='message_header'>{message.sender} - {message.hours}:{message.minutes}</p>}
            <p className='message_text'>{message.text}</p>
          </div>
        </div>
      ))
    )
  }

  function handleNewMessage() {
    event.preventDefault();
    if (!textRef.current.value) {
      return
    }
    setMessages([...messages, { sender: currentUser, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), hours: date.getHours(), minutes: date.getMinutes(), text: textRef.current.value }])
    textRef.current.value = '';
  }

  function handleLogin() {
    event.preventDefault();
    setCurrentUser(select);
    setReceiver(select == 'Ric' ? 'Fazers' : 'Ric')
  }

  function handleExit() {
    setCurrentUser();
    setReceiver();
  }

  function handleSelect(value) {
    setShowLogin(false);
    setSelect(value);
  }

  return (
    <>
      {currentUser ? <></> : <div className="login">
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="login_select">
            <p onClick={(e) => setShowLogin(!showLogin)} className='login_select_select'>{select} <span><MdArrowDropDown className='login_select_select_icon' size={'30px'} /></span> </p>
            <div className={`${showLogin ? 'show' : ''} login_select_options`}>
              {contacts.map((contact, index) => (
                <p className='option' key={index} onClick={(e) => handleSelect(contact)}>{contact}</p>
              ))}
            </div>
          </div>
          <button>Login</button>
        </form>
      </div>}
      {currentUser ? <div className="chat">
        <div className="chat_header">
          <div className="chat_header_info">
            <CgProfile size={'48px'} />
            <div className="name_status">
              {receiver}
              <div className="status">
                <div className="ball"></div>
                <div className="text">Online</div>
              </div>
            </div>
          </div>
          <div className="chat_header_exit">
            <AiOutlineClose onClick={handleExit} size={'20px'} />
          </div>
        </div>
        <div className="chat_body">
          <div className="chat_body_date"></div>
          <div className="chat_body_messages">
            <MessagesLoader />
          </div>
          <form onSubmit={handleNewMessage} className="chat_body_input">
            <input ref={textRef} className='chat_body_input_input' type="text" placeholder='Type your message here' />
            <AiOutlineSend className='icon_send' size={'22px'} />
          </form>
        </div>
      </div> : <></>}
    </>
  )
}

export default App
