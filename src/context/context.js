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
    const [isLoading, setIsLoading] = useState(false)
    //error
    const [error, setError] = useState({show: false, msg: ''})


    const searchGithubUser = async (user) => {
        toggleError()
        setIsLoading(true)
        try {
            const {data: userData} = await axios.get(`${rootUrl}/users/${user}`)
            setGithubUser(userData);
            const {login, followers_url} = userData;

            const [repos, followers] = await Promise.allSettled([
                axios.get(`${rootUrl}/users/${login}/repos?per_page=100`),
                axios.get(`${followers_url}?per_page=100`)
            ]);

            const status = 'fulfilled';

            if (repos.status === status) {
                setRepos(repos.value.data)
            }

            if (followers.status === status) {
                setFollowers(followers.value.data)
            }


        } catch (e) {
            toggleError(true, 'no user with that username')
        }
        setIsLoading(false)
        checkRequests();
    }

    //check rate
    const checkRequests = async () => {
        try {
            const {data} = await axios.get(`${rootUrl}/rate_limit`)
            let {rate: {remaining}} = data
            setRequests(remaining)
            if (remaining === 0) {
                toggleError(true, 'sorry you have exceeded your hourly rate limit')
            }
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
        <GithubContext.Provider value={{githubUser, repos, followers, requests, error, searchGithubUser, isLoading}}>
            {children}
        </GithubContext.Provider>)
}

export {GithubProvider, GithubContext}

