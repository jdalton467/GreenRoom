import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const DUMMY_DATA = [{
  senderId: "perborgen",
  text: "who'll win?"
},
{
  senderId: "jamedoe",
  text: "who'll win?"
}
]

const instanceLocator = "v1:us1:d031a961-3f61-46fb-8f62-d226a0d1460c";
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d031a961-3f61-46fb-8f62-d226a0d1460c/token";
const username = "jd123";
const roomId = 13408415;


class App extends Component {
  constructor(){
    super();
    this.state = {
      messages: DUMMY_DATA
    }
  }

  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    })

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, messages]
            })
          }
        }
      })
    })
  }


  render() {
    return (
      <div className="App">
       
        <MessageList messages={this.state.messages} />
       
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


export default App;
