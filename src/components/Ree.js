import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import './HeroSection.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useDispatch } from 'react-redux';
import { Button } from './Button';


const API_KEY = process.env.REACT_APP_API_KEY;

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

  const questionResponses = useSelector(state => state.questionResponses);

  let data1 = useSelector((state) => state.reducera.questionResponses);

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

  const handleCompleteStoreData = async () => {
    setIsTyping(true);
    const storeData = data1.map(qr => ({
      message: `Q: ${qr.question}\nA: ${qr.response}`,
      sender: "user"
    }));

    const additionalMessage = {
      message:
        "Act as psychology assistant: Give a very crisp inference and percentage on ADHD response provided (not more than two lines), this data will be reviewed by a psychologist further",
      sender: "user"
    };

    await processMessageToChatGPT([...messages, ...storeData, additionalMessage]);

    dispatch({ type: 'RESET_QUESTION_RESPONSES' });
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
          <button onClick={handleCompleteStoreData}>Diagnose</button>
        </div>
      </div>
    </div>
  );
}

export default App;
