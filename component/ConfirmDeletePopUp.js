import { StyleSheet, View} from 'react-native'
import React from 'react'
import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function ConfirmDeletePopUp(props) {

  const {isDialogVisible, isDeleting, setIsDialogVisible, itemToDelete, handleDelete} = props 

  const handleDismiss = () => {
    setIsDialogVisible(false);
  }

  return (!itemToDelete ? null : (
    <Portal>
    <Dialog visible = {isDialogVisible} onDismiss={handleDismiss}  style = {styles.container}>
      <Dialog.Title>Delete item</Dialog.Title>
      <Dialog.Content>
      <Text variant="bodyLarge" styles = {styles.title}>Are you sure you want to delete the following item?</Text>
      <Text variant="bodySmall"></Text>
      <View style = {styles.itemContainer}>
      <Text variant = "bodyMedium">{itemToDelete.dish_name}</Text>
      <Text variant = "bodyMedium">£{itemToDelete.price.toFixed(2)}</Text>
      </View>
        <Text variant="bodySmall">{itemToDelete.description} {itemToDelete.name} </Text>
      </Dialog.Content>
      <Dialog.Actions style={{justifyContent: 'space-between', gap: 10,}}>
      <Button 
             textColor="#4C5B61"
         
             style={styles.cancelButton}
      onPress={handleDismiss} disabled = {isDeleting}>Cancel</Button>
        <Button onPress={()=>{
          handleDelete(itemToDelete.id)}} disabled = {isDeleting}  
         
          style={styles.deleteButton}
          textColor="crimson">Delete</Button>
      </Dialog.Actions>
    </Dialog>
    </Portal>
  )
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton:{
    borderRadius: 29,
    borderColor: "#4C5B61",
    borderWidth: 1, 
    marginTop:20,
    flex: 1,
  },
  deleteButton:{
    flex: 1,
    borderRadius: 29,
    borderColor: "crimson",
    borderWidth: 1, 
    marginTop:20
  }
})