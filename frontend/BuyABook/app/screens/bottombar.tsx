import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; // Importar la librería de iconos

const BottomBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botón de Inicio */}
      <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/screens/HomeScreen')}>
        <Ionicons name="home" size={24} color="green" />
      </TouchableOpacity>

      {/* Botón de Atrás */}
      <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="green" />
      </TouchableOpacity>

      {/* Botón de Carrito */}
      <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/cart')}>
        <Ionicons name="cart" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,  // Asegura que la barra se estire a lo largo de la pantalla
    height: 60,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
  },
});

export default BottomBar;
