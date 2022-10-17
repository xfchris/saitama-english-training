import { collection, getDocs, query, doc, orderBy, addDoc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

type DataType = {
  [x: string]: any
}

class DatabaseApi {
  static collectionName = ''

  static create = async (obj: DataType) => {
    obj.createdAt = Timestamp.now().seconds
    const colRef = collection(db, this.collectionName)
    const data = await addDoc(colRef, obj)
    return data.id
  }

  static update = (id: string, obj: DataType) => {
    const colRef = collection(db, this.collectionName)
    return updateDoc(doc(colRef, id), obj)
  }

  static createOrUpdate = async (id: string | undefined, obj: DataType) => {
    return id ? this.update(id, obj) : this.create(obj)
  }

  static getAll = () => {
    const colRef = collection(db, this.collectionName)
    return getDocs(query(colRef, orderBy('createdAt', 'asc')))
  }

  static remove = async (id: string) => {
    const colRef = collection(db, this.collectionName)
    await deleteDoc(doc(colRef, id))
  }
}

export const firebaseApi = (collectionName: string) => {
  DatabaseApi.collectionName = collectionName
  return DatabaseApi
}
