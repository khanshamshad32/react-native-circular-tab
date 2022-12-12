import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({title, style, onPress, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, style]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Button;
