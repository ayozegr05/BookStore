import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const BooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://192.168.1.71:3000/'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={{uri: item.photo }} style={styles.image} onError={(e) => console.error('Error al cargar la imagen:', e.nativeEvent.error)} resizeMode="stretch" />
      <View style={styles.details}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.price}>{item.price} $</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => console.log('View More pressed')}>
        <Text style={styles.buttonText}>View More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => String(item._id)}
          horizontal // Activa el scroll horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 300 }}
        />
      )}
    </SafeAreaView>
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
    height: '70%',
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


export default BooksScreen;
