import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BooksScreen from "./BooksScreen.js";
import BottomBar from "./bottombar.tsx";

const Main = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buy a Book</Text>
            <View style={styles.booksContainer}>
                <BooksScreen/>
            </View>
            <BottomBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,  // Ocupa todo el espacio disponible
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 50,
        color: 'chocolate',
        textAlign: 'center',
    },
    booksContainer: {
        flex: 1,  // Asegura que la sección de libros ocupe el espacio restante
        width: '100%',
    }
});

export default Main;
