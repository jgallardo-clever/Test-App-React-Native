import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import React, { use, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

// Función para obtener los datos de la API
async function fetchData() {
  const response = await fetch('http://192.168.1.105:8000/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

export default function TableScreen() {
  const [data, setData] = React.useState([]); // Estado para almacenar los datos de la API
  const [loading, setLoading] = React.useState(true); // Estado para manejar la carga
  const [error, setError] = React.useState(null); // Estado para manejar errores

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData();
        console.log('Datos obtenidos:', result);
        setData(result);
      } catch (err) {
        console.error('Error al obtener datos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);

  if (loading) {
    return <ThemedText>Loading...</ThemedText>; // Muestra un mensaje de carga mientras se obtienen los datos
  }
  if (error) {
    return <ThemedText>Error: {error}</ThemedText>; // Muestra un mensaje de error si ocurre
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
      <IconSymbol
        size={310}
        color="#808080"
        name="chevron.left.forwardslash.chevron.right"
        style={styles.headerImage}
      />
      }>
      <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Table</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      
      {/* <ThemedText>{JSON.stringify(data, null, 2)}</ThemedText> */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.row}>
        <ThemedText style={styles.cell}>{item.id}</ThemedText>
        <ThemedText style={styles.cell}>{item.name}</ThemedText>
        <ThemedText style={styles.cell}>{item.email}</ThemedText>
          </ThemedView>
        )}
        ListHeaderComponent={
          <ThemedView style={styles.headerRow}>
        <ThemedText style={styles.headerCell}>ID</ThemedText>
        <ThemedText style={styles.headerCell}>Name</ThemedText>
        <ThemedText style={styles.headerCell}>Email</ThemedText>
          </ThemedView>
        }
      />

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reactLogo: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});