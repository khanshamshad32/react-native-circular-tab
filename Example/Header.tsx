import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header: React.FC<{title: string}> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingBottom: 20,
    backgroundColor: '#0D47A1',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Header;
