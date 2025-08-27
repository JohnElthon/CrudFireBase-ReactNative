import { useEffect,useState,  } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';

import { db } from '../src/firebaseConnection';
import {doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs, updateDoc} from 'firebase/firestore';

import { UsersList } from '../src/Users';

export  function FormUser() {

  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [cargo, setCargo] = useState("")

  const [showForm, setShowForm] = useState(false)

  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState("");

  useEffect(()=>{
    async function getDados() {
      /*const docref = doc(db, "users", "1")
      await getDoc(docref)
      .then((snapshot)=>{
        console.log(snapshot.data())
        setNome(snapshot.data()?.Nome)
      })
      .catch((err)=>{
        console.log("error: ")
        console.log(err)
    })*/
   /*onSnapshot(doc(db, "users", "2"),(doc)=>{
    setNome(doc.data()?.Nome)
   })
    
    }
    getDados();
  }, [])*/

  const usersRef = collection(db,"users");

   onSnapshot(usersRef, (snapshot)=>{
      let lista = [];
      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          nome: doc.data().Nome,
          idade: doc.data().Idade,
          cargo: doc.data().Cargo,

        })
      })
      //console.log(lista);
      setUsers(lista);


    })
  }
  getDados();
},[])

async function deleteUser() {


  
}

  async function handlerRegister() {
    /*await setDoc(doc(db, "users", "5"),{
      nome: "debora",
      idade: "27",
      cargo: "frontEnd"
    })
    .then(()=>{
      console.log("Cadastro com sucesso")
    })
    .catch((err)=>{
      console.log(err)
    })*/
   

    if(nome =="" || idade =="" || cargo ==""){
      alert("Preencha todos os Campos");
    setNome('');
    setIdade('');
    setCargo('');
    return;
    }
    
    
    await addDoc(collection(db,"users",),{
      
      Cargo:cargo,
      Idade:idade,
      Nome:nome
    })
    .then(()=>{
     console.log("Cadastro com sucesso")
    setNome('');
    setIdade('');
    setCargo('');
    })
    
    .catch((err)=>{
    console.log(err)
    })
    

  }

  function TrocarVisibilidade(){
    setShowForm(!showForm)
  }

  function editUser(data){
    setNome(data.nome);
    setIdade(data.idade);
    setCargo(data.cargo);
    setIsEditing(data.id);
    setShowForm(true);
  
  }

  async function handlerEditUser(){
    const docRef = doc(db, "users", isEditing);
    await updateDoc(docRef, {
      Nome: nome,
      Idade: idade,
      Cargo: cargo
    })
    setIsEditing("");
    setNome('');
    setIdade('');
    setCargo('');
  }

  // async function handlerEditUser(){
  //   if(nome =="" || idade =="" || cargo ==""){
  //     alert("Preencha todos os Campos");
  //   setNome('');
  //   setIdade('');
  //   setCargo('');
  //   return;
  //   }
    
  //   const userDoc = doc(db, "users", users[0].id);
  //   const newFields = {Nome: nome, Idade: idade, Cargo: cargo};
  //   await updateDoc(userDoc, newFields)
  //   .then(()=>{
  //     console.log("Atualizado com sucesso")
  //     setNome('');
  //     setIdade('');
  //     setCargo('');
  //     setIsEditing(false);
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }

 



  return (
    <View style={styles.container}>
    {showForm &&(  

<View>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
      style={styles.input}
      placeholder="Diite seu nome..."     
      value={nome}
      onChangeText={(text)=>setNome(text)}
      />

       <Text style={styles.label}>Idade:</Text>
      <TextInput
      style={styles.input}
      placeholder="Diite sua idade..."     
      value={idade}
      onChangeText={(text)=>setIdade(text)}
      />

       <Text style={styles.label}>Cargo:</Text>
      <TextInput
      style={styles.input}
      placeholder="Diite seu Cargo..."     
      value={cargo}
      onChangeText={(text)=>setCargo(text)}
      />
     
    {isEditing != "" ?(
 
  <TouchableOpacity style={styles.button} onPress={handlerEditUser}>
    <Text style={styles.buttonText}>Editar</Text>
  </TouchableOpacity>
 ):(
 
  <TouchableOpacity style={styles.button} onPress={handlerRegister}>
  <Text style={styles.buttonText}>Cadastrar</Text>
</TouchableOpacity>
 
 ) }
</View>
)}
       <TouchableOpacity style={styles.button} onPress={TrocarVisibilidade}>
        <Text style={styles.buttonText}>
        {showForm ? "Esconder Formulário" : "Mostrar Formulário"}
        </Text>
      </TouchableOpacity>    

      {/* {showForm %% (<Text>Aparecer</Text>)} */}

      <FlatList
      style={styles.lista}
      data={users}keyExtractor={(item)=> String(item.id)}
      renderItem={({item})=><UsersList data={item} handlerEdit={(item)=>editUser(item)}></UsersList>}
      />
          
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  marginTop:50

  },
   button:{
  backgroundColor:"#a6a6a6",
  alignItems:'center',
  marginTop:20,
  borderRadius:8,
  margin:10,
  borderRadius:10
  },
 
  buttonText:{
  padding:10,
   color:'#0000ff',
   fontWeight:'bold'
   
  },
  label:{
    color: "#0000ff",
    fontSize:20,
    marginBottom:4,
    marginLeft:10,
    fontWeight:'bold'
  },
  input:{
    borderWidth:2,
    marginBottom:20,
    marginLeft:10,
    marginRight:10,
    borderRadius:10
    

  }

});