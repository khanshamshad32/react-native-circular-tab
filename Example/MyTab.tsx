import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './Button';

const RemoveTabTitle = 'Remove Tab';
const colors = ['#80CBC4', '#90A4AE', '#E1BEE7', '#DCEDC8', '#FBE9E7'];

interface MyTabProps {
  index: number;
  tab: any;
  onRemovePress: (tab: any) => void;
}

const MyTab: React.FC<MyTabProps> = React.memo(
  ({index, tab, onRemovePress}) => {
    const backgroundColor = colors[index % colors.length];

    const handleRemovePress = useCallback(() => {
      if (onRemovePress) {
        onRemovePress(tab);
      }
    }, [onRemovePress, tab]);

    return (
      <View style={[styles.tabContainer, {backgroundColor}]}>
        <Text style={styles.tabTitle}>{tab}</Text>
        <Button title={RemoveTabTitle} onPress={handleRemovePress} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
  },
});

export default MyTab;
