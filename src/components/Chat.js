import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../App.css'
import {Routes, Route, useLocation} from 'react-router-dom'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import {add_rc} from '../redux/action'
import { useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "a mock interview with chatgpt as psycologist and user as adhd patient, ask question one by one and next question ask should be based on previous response provide. you have a total 7 questions to ask and self survey questionare is already performed and provided to you, focus on area with rating as very often and often, dont say that you are ai,"
}

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hi there, lets start session when you ready, please tell me your age for us to start!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
   let dataArray = messages;
   const navigate = useNavigate();

   

   const apiCallToStoreDataInServer = async () => {
    try {
      // Get the complete store data using useSelector
      const mobileNumber = localStorage.getItem('mobile');
      // Construct the data object
      console.log(mobileNumber)
      console.log(dataArray)
      const response = await fetch('https://gt-7tqn.onrender.com/api/auth/abc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, dataArray }),
      });

      if (!response.ok) {
        throw new Error('Failed to store data in the server');
      }
    } catch (error) {
      throw new Error('Error storing data in the server: ' + error.message);
    }
  };

  useEffect(() => {
    if (messages.length === 10) {
      try {
        apiCallToStoreDataInServer().then(() => {
          navigate('/ft'); // Navigate after API call is complete
        });
      } catch (error) {
        console.error('Error storing data:', error);
      }
    }
  }, [messages]);

  let data1 = useSelector((state) => state.reducera.questionResponses);
  let data2 = useSelector((state) => state.rchat.RC);

const storeData = data1.map(qr => ({
    message: `Q: ${qr.question}\nA: ${qr.response}`,
    sender: "user"
  }));

  const systemMessage1 = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": data1.map(qr => `${qr.question}: ${qr.response}`).join("\n")
  }
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const additionalMessage = {
    content:
      "ask question one by one to gather inputs as a psycologist for adhd diagnosis, ask question one by one and next question ask should be based on previous response provided",
    role: "user"
  };

  async function processMessageToChatGPT(chatMessages) { 
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });



    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        systemMessage1,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages
        // additionalMessage // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="App">
      <div style={{ position:"center", height: "700px", width: "1500px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App



