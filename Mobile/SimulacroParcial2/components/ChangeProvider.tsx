import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ElementDTO } from '@/app/(tabs)'

export const ChangeContext = React.createContext<any>(null)

const ChangeProvider = ({ children }: { children: React.ReactNode }) => {


    const [boolean, setBoolean] = React.useState<boolean>(false)

    return (
        <>
            <ChangeContext.Provider value={[boolean, setBoolean]}>
                {children}
            </ChangeContext.Provider>
        </>
    )
}

export default ChangeProvider

const styles = StyleSheet.create({})