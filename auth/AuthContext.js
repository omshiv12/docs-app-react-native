import * as React from 'react';

const initialState = {
    isLoading: true,
      isSignout: false,
      userToken: null,
      loginType:null,
}
export const AuthContext = React.createContext(initialState);