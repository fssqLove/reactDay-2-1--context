import React from 'react'

export const UserContext = React.createContext({name:"hotpinkBorder"});

export const UserProvider = UserContext.Provider;

export const UserConsumer = UserContext.Consumer;