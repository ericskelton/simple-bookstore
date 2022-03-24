import React, {useState} from 'react'
import Routes from './Routes'
import ToolBar from './Components/ToolBar';
import { AuthContext } from './Auth/AuthContext';

const App = () => {
    const [auth, setAuth] = useState({
        loggedIn: false,
        token: "",
        username: "",
        admin: undefined
    });


    return (
        <React.Fragment>
            <AuthContext.Provider value={[auth, setAuth]}>
                <ToolBar>
                    <div><Routes/></div>
                </ToolBar>
            </AuthContext.Provider>
        </React.Fragment>
    )
}

export default App;