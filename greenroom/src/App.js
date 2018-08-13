import React, { Component } from 'react';
import {ChatManager, TokenProvider} from '@pusher/chatkit';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';


const instanceLocator = "v1:us1:d031a961-3f61-46fb-8f62-d226a0d1460c";
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d031a961-3f61-46fb-8f62-d226a0d1460c/token";
const username = "jd123";
const roomId = 13408415;
var JWT;


class App extends Component {
  constructor(){
    super();
    this.state = {
      messages: [],
      token: ''
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount(){
   const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: username,
            tokenProvider: new TokenProvider({
                url: 'localhost:5000/auth'
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {

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
      text, 
      roomId: roomId
    })
  }


  render() {
    return (
      <div className="App">
        <Title />
        <MessageList messages={this.state.messages} />
        <SendMessageFrom sendMessage={this.sendMessage} />
        {this.state.response}
      </div>
    );
  }
}

class MessageList extends React.Component{
  render(){
    return(
      <ul className="message-list">
      {this.props.messages.map(message => {
        return (
          <li key={message.id}>
            <div>
              {message.senderId}
            </div>
            <div>
              {message.text}
            </div>
          </li>
        )
      })}
      </ul>
    )
  }
}

class SendMessageFrom extends React.Component{
  
  constructor(){
    super()
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  

  handleChange(e){
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }



  render(){
    return(
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input onChange={this.handleChange} value={this.state.message} placeholder="Type your message and hit Enter" type="text" />
      </form>
    )
  }
}

function Title(){
  return <p class="title">My awesome chat app </p>
}



export default App;
