import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'
import InsertComment from '@material-ui/icons/InsertComment'
import { Add, Apps, BookmarkBorder, Drafts, ExpandLess, ExpandMore, FileCopy, Inbox, PeopleAlt } from '@material-ui/icons'
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        db.collection('room').onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
        })
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>Clever Programming</h2>
                    <h3><FiberManualRecordIcon className="" />{user?.displayName}</h3>
                </div>
                <CreateIcon />
            </div>
            <SidebarOption Icon={InsertComment} title="Threads" />
            <SidebarOption Icon={Inbox} title="Mentions & reactions" />
            <SidebarOption Icon={Drafts} title="Saved items" />
            <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
            <SidebarOption Icon={PeopleAlt} title="People & user group" />
            <SidebarOption Icon={Apps} title="Apps" />
            <SidebarOption Icon={FileCopy} title="File Browser" />
            <SidebarOption Icon={ExpandLess} title="Show less" />
            <hr />
            <SidebarOption Icon={ExpandMore} title="Show more" />
            <hr />
            <SidebarOption Icon={Add} addChannelOptions={true} title="Add Group" />
            {/* connect to db and list all the channel */}
            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}
        </div>
    )
}

export default Sidebar
