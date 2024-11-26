import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useMemo } from 'react'
import { ElementDTO } from '@/app/(tabs)'
import { ListContext } from './ListProvider'

export const IDContext = React.createContext<any>(null)

const IDProvider = ({ children }: { children: React.ReactNode }) => {


    const [idToPost, setIdToPost] = React.useState<number>(9)

    // const [elementArray, setElementArray] = useContext(ListContext)

    // const nextElementId = useMemo(() => {

    //     setIdToPost(elementArray.length > 0 ? parseInt(elementArray[elementArray.length - 1].id) + 1 : 0).toString()
    // }, [elementArray])

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