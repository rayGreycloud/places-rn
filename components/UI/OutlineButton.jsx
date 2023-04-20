import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/styles';

const Button = ({ children, icon, onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, ({ pressed }) => pressed && styles.pressed]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={Colors.primary500}
        style={styles.icon}
      />
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500
  },
  icon: {
    marginRight: 6
  },
  buttonText: {
    color: Colors.primary500,
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
});
