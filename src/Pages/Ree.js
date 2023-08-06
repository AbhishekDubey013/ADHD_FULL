import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import '../components/HeroSection.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button';
import { Link,useNavigate } from 'react-router-dom';
import {add_rc} from '../redux/action'

const API_KEY = process.env.REACT_APP_API_KEY;
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "a mock interview with chatgpt as psycologist and user as adhd patient, ask question one by one and next question ask should be based on previous response provide. Ask a total of 10 question and self survey questionare is already performed please make an engaging interaction"
}

function App() {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    {
      message: "",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDiagnosed, setIsDiagnosed] = useState(false);
  const navigate = useNavigate();

  const questionResponses = useSelector(state => state.questionResponses);

  let data1 = useSelector((state) => state.reducera.questionResponses);
  let data2 = useSelector((state) => state.rchat.RC);

  console.log(data2)
 

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  let sum =0;

  const handleCompleteStoreData = async () => {
    setIsTyping(true);
    const storeData = data1.map(qr => ({
      message: `Q: ${qr.question}\nA: ${qr.response}`,
      sender: "user"
    }));


    const additionalMessage = {
      message:
        "responses are present from very often to very rarely, for very often score is 2 often 1 and for rest 0 and add all score and multiply by 5 present as adhd percentage and ask ask user to go for detailed survey DONT SHOW CALCULATION USED TO USER",
      sender: "user"
    };

    await processMessageToChatGPT([...messages, ...storeData, additionalMessage]);
    dispatch({ type: 'RESET_QUESTION_RESPONSES' });
    setIsDiagnosed(true);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      })
      .then((data) => data.json())
      .then((data) => {
        const responseMessage = data.choices[0].message.content;
        dispatch(add_rc(responseMessage));
        setMessages([{
          message: responseMessage,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
      })
      .catch((error) => {
        console.error("Error processing message:", error);
        setIsTyping(false);
      });
  }

  useEffect(() => {
    console.log("questionResponses:", questionResponses);
    console.log("data1:", data1);
  }, [questionResponses, data1]);

  return (
    <div className="App">
      <div className="chat-container">
        <div className="message-list">
          <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="Analyzing" /> : null}>
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
        </div>
        <div className="store-data">
          {/* <h2>Store Data:</h2> */}
          {questionResponses && questionResponses.length > 0 ? (
            <ul>
              {questionResponses.map((qr, index) => (
                <li key={index}>
                </li>
              ))}
            </ul>
          ) : (
            <p>It will take few Secs</p>
          )}
          <div className="store-data">
          {isDiagnosed ? (
            <Link to={{
              pathname: '/reg'
            }}>
              <button>Go to Chat</button>
            </Link>
            
          ) : (
            <button onClick={handleCompleteStoreData}>Diagnose</button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;



