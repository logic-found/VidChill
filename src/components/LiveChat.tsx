import React, { useState, useRef, useEffect } from 'react'
import {
    IoIosArrowUp as ArrowUp,
    IoIosArrowDown as ArrowDown,
} from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import LiveChatMessage from "../components/LiveChatMessage";
import { LiveChatMessage as Message } from "../Types";
import { RootState, AppDispatch } from "../redux/store";
import { ADD_MESSAGE } from "../redux/LiveChatSlice";
import { LiveChatData, GenerateRandomText } from "../utils/data";

type EventType = React.ChangeEvent<HTMLInputElement>;


const LiveChat = () => {
    const [showLiveChat, setShowLiveChat] = useState(true);
    const dispatch = useDispatch<AppDispatch>()
    const messages = useSelector((state: RootState) => state.liveChat.messages);
    const [liveMessage, setLiveMessage] = useState('')
    const liveChatDivRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (liveChatDivRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = liveChatDivRef.current
            if (scrollTop + clientHeight < scrollHeight - (clientHeight / 2)) return
            else {
                liveChatDivRef.current.scrollTop = liveChatDivRef.current.scrollHeight;
            }
        }
    }, [messages])


    useEffect(() => {
        const interval = setInterval(() => {
            const { avatar, name } =
                LiveChatData[Math.floor(Math.random() * LiveChatData.length)];
            const message = GenerateRandomText(20);
            const id = Math.random().toString() + message
            dispatch(
                ADD_MESSAGE({
                    id,
                    avatar,
                    name,
                    message,
                })
            );
        }, 800);

        return () => {
            clearInterval(interval);
        }
    }, []);




    const addLiveChatMessage = (e: any) => {
        if (e.code !== "Enter") return;
        dispatch(
            ADD_MESSAGE({
                id: Math.random().toString() + liveMessage,
                name: "Rashika Sahu",
                message: liveMessage,
                avatar: "/Rashika_Sahu.jpeg",
            })
        );
        setLiveMessage('')
    };

    const toggleShowLiveChat = () => {
        setShowLiveChat((prevState) => !prevState);
    };


    return (
        <>
            <div className=" border-[2px] border-zinc-700 h-fit w-full rounded  box-border">
                <div className="  h-10 w-full text-center font-bold text-white border-b-[2px] border-zinc-700 ">
                    <div
                        className="h-full text-base md:text-lg cursor-pointer flex gap-2 justify-center items-center  py-2"
                        onClick={toggleShowLiveChat}
                    >
                        {showLiveChat ? "Hide " : "Show "}Live Chat
                        {showLiveChat ? (
                            <ArrowUp />
                        ) : (
                            <ArrowDown />
                        )}
                    </div>
                </div>
                {showLiveChat && (
                    <div className="h-96">
                        <div className="p-2 h-[87%] flex flex-col gap-2 overflow-y-scroll" ref={liveChatDivRef}>
                            {messages.map(
                                (message: Message) => (
                                    <LiveChatMessage
                                        key={message.id}
                                        message={message}
                                    />
                                )
                            )}
                        </div>
                        <div className="h-[13%] w-full border-t-[2px] border-zinc-700 p-1 px-2">
                            <input
                                type="text"
                                className="w-full rounded h-full bg-transparent text-white px-2 py-1 font-semibold border-[1px] border-white"
                                placeholder="Type Message.."
                                onKeyDown={(e: any) => addLiveChatMessage(e)}
                                value={liveMessage}
                                onChange={(e: EventType) => setLiveMessage(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default LiveChat