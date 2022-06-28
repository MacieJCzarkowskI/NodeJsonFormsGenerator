import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import React, { createContext, FC, useContext } from 'react'

const AxiosContext = createContext<AxiosInstance | undefined>(undefined)
AxiosContext.displayName = 'AxiosContext'

export const useAxiosContext = (): AxiosInstance => useContext(AxiosContext) as AxiosInstance

export interface AxiosProviderProps {
  config: AxiosRequestConfig
}

export const AxiosProvider: FC<AxiosProviderProps> = ({ config, children }) => {
  const axiosInstance: AxiosInstance = Axios.create(config)
  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>
}
