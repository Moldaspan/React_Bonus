import React, {useEffect, useState} from 'react';
import './bar.css'
import SidebarThread from "../sidebar-thread/sidebar-thread";
import axios from 'axios';
import {Avatar} from "@material-ui/core";
import {useNavigate} from "react-router-dom";


function Bar() {
    const [threads, setThreads] = useState([]);
    const pageRoute = useNavigate();

    useEffect(() => {
        axios.get('/api/v1/threads/')
            .then((response) => setThreads(response.data))
            .catch((error) => console.error('Error fetching threads:', error));
    }, []);

    return (
        <div className={"bar"}>
            <div className={"bar_header"}>
                <div className={"bar_search"}>
                    <input className={"search_input"} placeholder={"Search"} type="text"/>
                </div>
            </div>

            <div className={"bar_thread"}>
                {threads.map((thread) => (
                    <SidebarThread
                        onClick={() => {
                            console.log("Clicked on thread:", thread.id);
                            pageRoute(`/threads/${thread.id}/`);
                        }}
                        key={thread.id}
                        id={thread.id}
                        threadName={thread.name}
                    />
                ))}
            </div>
            <div className={"bar_bottom"}>
                <Avatar/>

            </div>

        </div>
    );
}

export default Bar;