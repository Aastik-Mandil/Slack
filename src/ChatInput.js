import React,{useState} from 'react'
import "./ChatInput.css"
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function ChatInput({ channelName, channelId }) {
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (channelId) {
            db.collection('room').doc(channelId).collection('messages').add({ message: input, timestamp: firebase.firestore.FieldValue.serverTimestamp(), user: user?.displayName, userImage: user?.photoURL });
            setInput("");
        }
    }
    return (
        <div className="chatInput">
            <form>
                <input type="text" placeholder={`Message #${channelName}`} onChange={(e) => setInput(e.target.value)} value={input} />
                <button type="submit" onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default ChatInput;
