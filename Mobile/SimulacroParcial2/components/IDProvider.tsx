import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ElementDTO } from '@/app/(tabs)'

export const IDContext = React.createContext<any>(null)

const IDProvider = ({ children }: { children: React.ReactNode }) => {


    const [idToPost, setIdToPost] = React.useState<number>(9)

    return (
        <>
            <IDContext.Provider value={[idToPost, setIdToPost]}>
                {children}
            </IDContext.Provider>
        </>
    )
}

export default IDProvider

const styles = StyleSheet.create({})