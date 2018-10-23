import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
// import RoomList from './components/RoomList';
// import NewRoomForm from './components/NewRoomForm';
import {tokenUrl, instanceLocator} from './config';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';



// const instanceLocator = "v1:us1:d031a961-3f61-46fb-8f62-d226a0d1460c";
// const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d031a961-3f61-46fb-8f62-d226a0d1460c/token";
// const username = "jd123";
// const roomId = 13408415;
// var JWT;

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }
  
  componentDidMount(){
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: instanceLocator,
        userId: 'rexkwondoe',
        tokenProvider: new Chatkit.TokenProvider({
          url: tokenUrl
        })

      })

      chatManager.connect().then(currentUser => {
        this.currentUser = currentUser
        currentUser.subscribeToRoom({
          roomId: 19322700,
          hooks: {
            onNewMessage: message => {
              console.log('message.text: ', message.text);
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text: text,
      roomId: 19322700
    })
  }

  render(){
    return(
        <div className="app">
          <MessageList messages={this.state.messages}/>
          <SendMessageForm sendMessage={this.sendMessage} />
        </div>
    );
  }
}





export default App;
