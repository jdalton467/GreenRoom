import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }
  
  componentDidMount(){
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: instanceLocator,
        userId: 'rexkwondoe',
        tokenProvider: new Chatkit.TokenProvider({
          url: '/auth'
        })

      })

      chatManager.connect().then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
      


      }).catch(err => console.log('error on connecting: ', err))
  }

    getRooms(){
      this.currentUser.getJoinableRooms().then(joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          })
        }).catch(err => console.log('error on joinableRooms: ', err))
    }


    subscribeToRoom(roomId){
          this.setState({messages: []})
          this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
              onNewMessage: message => {
                console.log('message.text: ', message.text);
                this.setState({
                  messages: [...this.state.messages, message]
                })
              }
            }
        }).then(room =>{
          this.setState({
            roomId: room.id
          })
            this.getRooms()
        }).catch(err => console.log('error on joinableRooms: ', err))
   }

  sendMessage(text){
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    })
  }

  createRoom(name){
    this.currentUser.createRoom({
      name
    }).then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with createRoom : ', err))
  }

  render(){
    return(
        <div className="app">
          <RoomList subscribeToRoom={this.subscribeToRoom} rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} roomId={this.state.roomId}/>
          <MessageList roomId={this.state.roomId} messages={this.state.messages}/>
          <SendMessageForm disabled={!this.state.roomId} sendMessage={this.sendMessage} />
          <NewRoomForm createRoom={this.createRoom} />
        </div>
    );
  }
}





export default App;
