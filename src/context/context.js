import React, {useState, useEffect, createContext} from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({children}) => {
    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers)
    //request loading
    const [requests, setRequests] = useState(0);
    const [loading, isLoading] = useState(false)
    //error
    const [error, setError] = useState({show: false, msg: ''})

    //check rate
    const checkRequests = async () => {
        try {
            const {data} = await axios.get(`${rootUrl}/rate_limit`)
            let {rate: {remaining}} = data
            setRequests(remaining)
            if (remaining === 0) {
                toggleError(true, 'sorry you have exceeded your hourly rate limit')
            }
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    const toggleError = (show = false, msg = '') => {
        setError({show, msg})
    }


    useEffect(() => {
        checkRequests();
    }, [])

    return (
        <GithubContext.Provider value={{githubUser, repos, followers, requests, error}}>
            {children}
        </GithubContext.Provider>
    )
}

export {GithubProvider, GithubContext}

