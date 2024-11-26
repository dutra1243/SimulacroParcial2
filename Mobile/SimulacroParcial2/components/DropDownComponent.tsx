import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ChangeContext } from './ChangeProvider';
import { store } from 'expo-router/build/global-state/router-store';
import { ListContext } from './ListProvider';
import { ElementDTO } from '@/app/(tabs)';


const DropdownComponent = ({ value, handleChange }: { value: string, handleChange: (value: string) => void }) => {

    const [elementArray, setElementArray] = useContext(ListContext)


    const data = [
        { label: "", value: '' },
        { label: "Easy", value: 'easy' },
        { label: "Medium", value: 'medium' },
        { label: "Hard", value: 'hard' },
    ]

    const [isFocus, setIsFocus] = useState(false);

    const [storedChanges, setStoredChanges] = useContext(ChangeContext)


    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    handleChange(item.value);
                    setStoredChanges({ ...storedChanges, difficultyValue: item.value, difficultyLabel: item.label });
                    setIsFocus(false);
                }}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 10,
        minWidth: 300,
    },
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: 'whitesmoke',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});