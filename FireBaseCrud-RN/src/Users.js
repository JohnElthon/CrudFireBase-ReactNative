import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { db } from "./firebaseConnection";
import { deleteDoc, doc } from "firebase/firestore";

export function UsersList({data, handlerEdit}){

  async function handlerDeletarItem(){
        //console.log(data)
        const docRef = doc(db, "users", data.id);
        await deleteDoc(docRef)
        }

        function handlerEditUser(){
           // console.log(data)
           handlerEdit(data)

        }

    return(
        <View style={styles.container}>
            <Text>Nome: {data.nome}</Text>
            <Text>Idade: {data.idade}</Text>
            <Text>Cargo: {data.cargo}</Text>

            <TouchableOpacity style={styles.button} onPress={handlerDeletarItem}>
              <Text style={styles.buttonText}>Deletar usuário</Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.buttonEdit} onPress={handlerEditUser}>
              <Text style={styles.buttonText}>Editar usuário</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#f0f0f0",
        padding:10,
        borderRadius:5,
        marginBottom:15
    },
    button:{
        backgroundColor:'red',
        padding:10,
        marginTop:10,
        width:'35%',
        borderRadius:15,
        borderWidth:2
        

    },
    buttonText:{
        color: '#fff',
        textAlign:'center'
    },
    buttonEdit:{
        backgroundColor:'green',
        padding:10,
        marginTop:10,
        width:'35%',
        borderRadius:15,
        borderWidth:2
    }
})