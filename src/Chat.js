import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { useParams } from 'react-router-dom';
import { StarBorderOutlined, InfoOutlined } from '@material-ui/icons';
import Message from './Message';
import ChatInput from './ChatInput';
import db from './firebase';

function Chat() {
    const { roomId } = useParams();
    const [roomDetail, setRoomDetail] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db.collection('room').doc(roomId).onSnapshot(snapshot => {
                setRoomDetail(snapshot.data());
            });
            db.collection('room').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
                setRoomMessages(snapshot.docs.map(doc => doc.data()));
            });
        }
    }, [roomId])

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong>#{roomDetail?.name}</strong><StarBorderOutlined />
                    </h4>
                </div>
                <div className="chat__headerRight">
                    <p><InfoOutlined /> Details</p>
                </div>
            </div>
            <div className="chat__messages">
                {roomMessages.map(({ message, timestamp, user, userImage }) => (
                    <Message message={message} timestamp={timestamp} user={user} userImage={userImage} />
                ))}
            </div>
            <ChatInput channelName={roomDetail?.name} channelId={roomId} />
        </div>
    )
}

export default Chat

// firebase init
// add hosting
// then select your project
// build
// y
// npm run build