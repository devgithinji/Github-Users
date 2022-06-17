import React from 'react';
import {Dashboard, Login, PrivateRoute, AuthWrapper, Error} from './pages';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => (
    <AuthWrapper>
        <Router>
            <Routes>
                <Route path='/' element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                }/>
                <PrivateRoute path='/' exact>
                    <Dashboard/>
                </PrivateRoute>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </Router>
    </AuthWrapper>
);

export default App;
