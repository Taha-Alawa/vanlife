// these from firebase
import { initializeApp } from "firebase/app";
import { 
  collection, 
  doc, 
  getFirestore, 
  getDocs, 
  getDoc, 
  query, 
  where} from "firebase/firestore/lite"

const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "Vans");
const userCollectionRef = collection(db, "users");
// these from firebase

export const getVans = async() => {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))

  return dataArr
}

export const getVan = async(id) => {
  const docRef = doc(db, "Vans", id)
  const vanSnapshot = await getDoc(docRef)

  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id
  }
}

export const getHostVans = async() => {
  const q = query(vansCollectionRef, where("hostId", "==", "123"))
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))

  return dataArr
}


// export const loginUser = async(creds) => {
//   const querySnapshot = await getDocs(userCollectionRef);

//   const data = querySnapshot.docs.map((user) => ({
//     ...user.data(),
//     email: user.email,
//     password: user.password,
//   }));
  
  
//   return data
// } 

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
