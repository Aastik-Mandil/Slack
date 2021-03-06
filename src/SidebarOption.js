import React from 'react'
import "./SidebarOption.css"
import { useHistory } from 'react-router-dom'
import db from './firebase';

function SidebarOption({ Icon, title, id, addChannelOptions }) {
    const history = useHistory();
    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');
        if (channelName) {
            db.collection('room').add({ name: channelName });
        }
    }
    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`);
        }
        else {
            history.push(title);
        }
    }
    return (
        <div className="sidebaroption" onClick={addChannelOptions ? addChannel : selectChannel}>
            {Icon && <Icon className="sidebaroption__icon" />}
            {Icon ? (<h3>{title}</h3>) : (<h3 className="sidebaroption__channel">#
                <span className="sidebaroption__hash">{title}</span>
            </h3>)}
        </div>
    )
}

export default SidebarOption
