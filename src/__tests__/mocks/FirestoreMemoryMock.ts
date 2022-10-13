import { vi } from 'vitest'
import { Word } from '../../types/config'
import { v4 as uuid } from 'uuid'

export const memoryDBFirebase: any = {}

vi.mock('firebase/firestore', () => ({
  getFirestore: () => true,
  orderBy: () => true,
  collection: (db: any, table: string) => table,
  query: (table: string) => table,
  getDocs: (table: string) => {
    return Promise.resolve(fsMemoryGetDocs(table))
  },
  addDoc: (table: string, obj: any) => {
    return Promise.resolve(fsMemoryAddDoc(table, obj))
  },
  doc: (table: string, id: string) => {
    const response = {
      table,
      doc: {},
      docIndex: -1
    }
    memoryDBFirebase[table].forEach((row: any, index: number) => {
      if (row.id === id) {
        response.doc = row
        response.docIndex = index
      }
    })
    return response
  },
  updateDoc: ({ table, doc, docIndex }: any, objNewChanges: any) => {
    const newData = { ...doc.data(), ...objNewChanges }
    memoryDBFirebase[table][docIndex] = {
      id: doc.id,
      data: () => newData
    }
    return Promise.resolve(newData)
  },
  deleteDoc: ({ table, docIndex }: any) => {
    delete memoryDBFirebase[table][docIndex]
    return Promise.resolve(true)
  }
}))

export function fsMemoryAddDoc(table: string, obj: any) {
  const uniqueId = uuid()
  if (!memoryDBFirebase[table]) {
    memoryDBFirebase[table] = []
  }
  memoryDBFirebase[table].push({
    id: uniqueId,
    data: () => obj
  })
  return uniqueId
}

export function fsMemoryGetDocs(table: string) {
  return {
    docs: memoryDBFirebase[table]
  }
}

const words: Partial<Word>[] = [
  {
    english: 'Hello',
    spanish: 'Hola',
    category: '1',
    createdAt: 123456
  },
  {
    english: 'Car',
    spanish: 'Automovil',
    category: '1',
    createdAt: 7891011
  },
  {
    english: 'Father',
    spanish: 'Padre',
    category: '1',
    createdAt: 123457
  }
]

words.forEach(word => {
  fsMemoryAddDoc('words', word)
})
