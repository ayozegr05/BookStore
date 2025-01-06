import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de iconos de Expo

const BookDetail = () => {
  const { id } = useGlobalSearchParams(); // Obtener el 'id' de la URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

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
            <Text style={styles.synopsis}>{book.synopsys}</Text>
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
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '90%',
    minHeight: 600,
    padding: 10,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
