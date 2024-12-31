import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

const BookDetail = () => {
  const { id } = useGlobalSearchParams(); // Obtener el 'id' de la URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://192.168.1.76:3000/book/${id}`); // Usar el 'id' en la URL
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
     <View style={styles.card}>
          <Text style={styles.title}>{book.title}</Text>
          <Image source={{uri: book.photo }} style={styles.image} onError={(e) => console.error('Error al cargar la imagen:', e.nativeEvent.error)} resizeMode="stretch" />
          <View style={styles.details}>
            <Text style={styles.author}>{book.author}</Text>
            <Text style={styles.author}>{book.synopsys}</Text>
            <Text style={styles.price}>{book.price} $</Text>
          </View>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => console.log('BUUUUUUUY')}
            >
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: 250,
    padding: 10,
    margin: 20,
    marginStart: 70,
    elevation: 12, // Para sombra en Android
    shadowColor: '#000', // Para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '50%',
  },
  details: {
    padding: 10,
  },
  author: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: 'green',
  },
  button: {
    backgroundColor: 'darkgreen',
    padding: 10,
    alignItems: 'center',
    color: '#d2691e',
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BookDetail;
