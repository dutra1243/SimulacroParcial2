import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ElementDTO } from '@/app/(tabs)'

export const ElementContext = React.createContext<any>(null)

const ElementProvider = ({ children }: { children: React.ReactNode }) => {

    const [elementData, setElementData] = React.useState<ElementDTO>({ id: "0", name: "", description: "", moons: 0, moon_names: [""], image: "" })

    return (
        <>
            <ElementContext.Provider value={[elementData, setElementData]}>
                {children}
            </ElementContext.Provider>
        </>
    )
}

export default ElementProvider

const styles = StyleSheet.create({})