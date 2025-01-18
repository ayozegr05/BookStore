import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de iconos de Expo
import BottomBar from './bottombar.tsx';

const BookDetail = () => {
  const { id } = useGlobalSearchParams(); // Obtener el 'id' de la URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://192.168.1.71:3000/book/${id}`); // Usar el 'id' en la URL
      const data = await response.json();
      console.log('Book details:', data); // Verifica los detalles del libro
      setBook(data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!book) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text>No book details found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        horizontal={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>{book.title}</Text>
          <Image 
            source={{ uri: book.photo }} 
            style={styles.image} 
            onError={(e) => console.error('Error al cargar la imagen:', e.nativeEvent.error)} 
            resizeMode="contain" 
          />
          <View style={styles.details}>
            <Text style={styles.author}>{book.author}</Text>

            {/* Descripción colapsable */}
            <Text style={styles.synopsis}>
              {showFullDescription ? book.synopsys : book.synopsys.substring(0, 150) + '...'}
            </Text>

            {/* Botón para expandir la descripción */}
            <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
              <Text style={styles.readMore}>{showFullDescription ? 'Leer menos' : 'Leer más'}</Text>
            </TouchableOpacity>
            <Text style={styles.price}>{book.price} $</Text>
          </View>
          
          {/* Contenedor de los botones */}
          <View style={styles.buttonContainer}>
            {/* Botón de "Favoritos" */}
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => console.log('Added to Favorites')}
            >
              <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>
            {/* Botón de "Añadir al carrito" */}
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => console.log('Added to Cart')}
            >
              <Ionicons name="cart" size={24} color="darkgreen" />
            </TouchableOpacity>
            {/* Botón de "Buy Now" */}
            <TouchableOpacity 
              style={styles.buyButton} 
              onPress={() => console.log('Buy Now clicked')}
            >
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 80,  // Añadir un espacio para los botones
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    width: '85%',
    padding: 10,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,  // Añadir margen inferior para que no se pegue al borde
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  details: {
    padding: 10,
  },
  author: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    textAlign: 'center'
  },
  synopsis: {
    fontSize: 14,
    marginBottom: 10,
  },
  readMore: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  price: {
    fontSize: 18,
    color: 'green',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row', // Botones en fila
    justifyContent: 'space-around', // Espaciado entre botones
    alignItems: 'center',
    marginTop: 20,
  },
  buyButton: {
    backgroundColor: 'darkgreen',
    padding: 10,
    borderRadius: 5,
    width: '40%', // Botón más grande
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#f0f0f0', // Fondo gris claro para los botones pequeños
    padding: 10,
    borderRadius: 50, // Botón circular
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BookDetail;
