import React, {  useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import Axios from "axios";
import ProductService from '../services/product.js'
import 'react-chat-widget/lib/styles.css';

function Chatbot({token}) {
  const [chat,setChat] = useState([]);
  const [inputMessage,setInputMessage] = useState('');
  const [botTyping,setbotTyping] = useState(false);
  
  const handleNewUserMessage = (newMessage) => {
    setbotTyping(true)
    chatbotAPI(newMessage)
  };

  const chatbotAPI =(msg)=>{
        
        if(token===null){
          let data = {
            "message": msg,
            "tag": "",
        };
          ProductService.unChatbot(data).then(response=>{
            let data = response.data
            let responseMessage = data.message;
                setbotTyping(false);
                addResponseMessage(responseMessage);
        }).catch(err=>{
            console.log("chatbot",err.toString())
        })
        }
        else if(token!== null){
          let data = {
            "message": msg,
            "tag": "",
        };
          ProductService.chatbot(token, data).then(response=>{
            let data = response.data
            let responseMessage = data.message;
                setbotTyping(false);
                addResponseMessage(responseMessage);
        }).catch(err=>{
            console.log("chatbot",err.toString())
        })
        }
        
    }
  return (
    <div className="chatbot">
      <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="E-commerce Chatbot"
          subtitle={botTyping === true ?(<h6>Bot Typing</h6>):(null)}
        />
    </div>
  );
}

export default Chatbot;