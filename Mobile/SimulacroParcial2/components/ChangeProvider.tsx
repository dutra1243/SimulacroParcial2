import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ElementDTO } from '@/app/(tabs)'

export const ChangeContext = React.createContext<any>(null)

const ChangeProvider = ({ children }: { children: React.ReactNode }) => {


    const [storedChanges, setStoredChanges] = React.useState<{ elementsChanged: boolean, filterIsOn: "" }>({ elementsChanged: false, filterIsOn: "" })

    return (
        <>
            <ChangeContext.Provider value={[storedChanges, setStoredChanges]}>
                {children}
            </ChangeContext.Provider>
        </>
    )
}

export default ChangeProvider

const styles = StyleSheet.create({})