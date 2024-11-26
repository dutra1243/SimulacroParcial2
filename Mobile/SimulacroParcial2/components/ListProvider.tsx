import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ElementDTO } from '@/app/(tabs)'

export const ListContext = React.createContext<any>(null)

const ListProvider = ({ children }: { children: React.ReactNode }) => {

    const [elementArray, setElementArray] = React.useState<ElementDTO[]>([{ id: "0", name: "", description: "", difficulty: "", favourite: false }])

    return (
        <>
            <ListContext.Provider value={[elementArray, setElementArray]}>
                {children}
            </ListContext.Provider>
        </>
    )
}

export default ListProvider

const styles = StyleSheet.create({})