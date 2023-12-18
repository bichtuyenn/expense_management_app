import React ,{createContext,useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [email, setEmail] = useState('20522134@gm.uit.edu.vn');
    const [password, setPassword] = useState('huynhthibichtuyen');
    const [isAuthenticated,setisAuthenticated] = useState(false);

    return (
        <AuthContext.Provider 
            value={{email, setEmail,password,setPassword,isAuthenticated,setisAuthenticated}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext,AuthProvider};