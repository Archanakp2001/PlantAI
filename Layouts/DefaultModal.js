import React from "react";
import { Button, Portal, Provider, Modal } from 'react-native-paper';
import { Text, View, StyleSheet, Dimensions } from "react-native";



const DefaultModal = ({modalVisible, hideModal, children}) => {
  return(
    <Provider>
        <Portal>
            <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.container}>
              {children}
            </Modal>
        </Portal>
    </Provider>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    height: '80%',
    marginTop: 30,
    alignSelf: "center",
    borderRadius: 20,
    justifyContent: "flex-start",
  },
})

export default DefaultModal