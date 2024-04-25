import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 as CrossIcon } from "react-icons/rx";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { getSearchResults, SET_SEARCH_KEYWORD, SET_SEARCH_SUGGESTION_CACHE } from '../redux/SearchSlice'
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import axios from "axios";

type EventType = React.ChangeEvent<HTMLInputElement>;

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const searchKeyword: string = useSelector((state: RootState) => state.search.searchKeyword)
    const searchSuggestionCache = useSelector((state: RootState) => state.search.searchSuggestionCache)
    const loading = useSelector((state: RootState) => state.search.loading)
    const [showSearchSuggestion, setShowSearchSuggestion] = useState(false)
    const [searchSuggestion, setSearchSuggestion] = useState<any[]>([])

    useEffect(() => {
        let timer = setTimeout(() => {
            if (searchSuggestionCache[searchKeyword]) {
                setSearchSuggestion(searchSuggestionCache[searchKeyword])
            }
            else getSuggestionsHandler(searchKeyword)
        }, 200)
        return () => {
            clearTimeout(timer)
        }
    }, [searchKeyword])

    
    const onSearchKeywordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SET_SEARCH_KEYWORD(e.target.value))
        
    }
    
    const onClearKeywordChangeHandler = () => {
        dispatch(SET_SEARCH_KEYWORD(""))
    }
    
    
    const onSearchKeywordSetHandler = (keyword: string) => {
        dispatch(SET_SEARCH_KEYWORD(keyword))
        setShowSearchSuggestion(false)
        navigate('/search');
        dispatch(getSearchResults(keyword))
    }
    const searchHandler = (e: EventType | any) => {
        if (e.key !== 'Enter' && e.type !== 'click') return
        else if (searchKeyword === "") return
        setShowSearchSuggestion(false)
        navigate('/search');
        dispatch(getSearchResults(searchKeyword))
    }

    const getSuggestionsHandler = async (keyword: string) => {
        try{
            const { data }  = await axios.get(`${import.meta.env.VITE_APP_CORS_PROXY_SERVER}/getSearchSuggestions/${keyword}`)
            const response = data?.response
            if (response?.length > 0) setSearchSuggestion(response)
            else setSearchSuggestion([])
            if (searchKeyword) dispatch(SET_SEARCH_SUGGESTION_CACHE({ key: searchKeyword, value: response }))
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="w-full flex  justify-between  items-center gap-3 px-3 py-2 h-fit text-xl sm:px-8 sm:gap-3 lg:text-2xl sticky z-10 top-0 bg-[#181818] shadow-2xl text-white mb-1">
                {/* logo */}
                <div className="flex gap-5 sm:gap-8 h-fit w-fit">
                    <Link className="flex gap-1 items-center justify-center cursor-pointer" to="/">
                        <img src="/logo.ico" className="h-6 w-6 sm:h-10 sm:w-10" />
                        <div className="hidden sm:block">VidChill</div>
                    </Link>
                </div>

                <div className="flex flex-col">
                    {/* search bar */}
                    <div className="flex h-10 ">
                        <div className="flex justify-between items-center relative h-full w-44 sm:w-96 border-zinc-700 border-[1px] border-r-0 rounded-l-full">
                            <input
                                type="text"
                                placeholder="Search"
                                className="h-full w-full px-2 sm:pl-3  bg-transparent text-sm sm:text-base md:text-lg  focus:outline-none"
                                value={searchKeyword}
                                onChange={onSearchKeywordChangeHandler}
                                onKeyUp={(e: any) => searchHandler(e)}
                                onFocus={() => setShowSearchSuggestion(true)}
                                onBlur={() => setShowSearchSuggestion(false)}
                            />
                            {searchKeyword && <div className="w-fit cursor-pointer h-full text-lg sm:text-xl flex items-center justify-center bg-transparent  px-1 " onClick={onClearKeywordChangeHandler}><CrossIcon /></div>}
                        </div>
                        <div className="h-full bg-zinc-800 rounded-r-full px-2 hover:bg-zinc-700 cursor-pointer flex justify-center items-center" onClick={(e: any) => searchHandler(e)} >
                            <SearchIcon />
                        </div>
                    </div>

                    {showSearchSuggestion && <div className=" bg-zinc-800 absolute top-[3.2rem] sm:top-14 w-44 sm:w-96 rounded-lg text-base flex flex-col gap-1 z-10">
                        {searchSuggestion?.map((suggestion) =>
                            <div className="px-2 py-1 sm:py-2  hover:bg-zinc-700 flex  gap-2  h-9 cursor-context-menu" key={suggestion} onMouseDown={() => onSearchKeywordSetHandler(suggestion)}>
                                <div className="h-full flex items-center justify-center">
                                    <SearchIcon />
                                </div>
                                <div className="h-full max-h-full w-full overflow-x-auto whitespace-nowrap remove-scrollbar overflow-y-hidden">{suggestion}</div>
                            </div>)}
                    </div>}
                </div>

                <div className="flex items-center justify-center h-fit w-fit"><img src="/Rashika_Sahu.jpeg" className="h-6 w-6 sm:h-10 sm:w-10 rounded-full" /></div>

            </div>
            {loading && (
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-pink-500 animate-pulse"></div>
            )}
            
        </>
    );
};

export default Header;
