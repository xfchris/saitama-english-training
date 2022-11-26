import Swal, { SweetAlertOptions } from 'sweetalert2'
import { trans } from '../config/i18n'
import { Word } from '../types/config'
import sample from 'lodash.sample'
import HTMLReactParser from 'html-react-parser'
import NoSleep from 'nosleep.js'

export const noSleep = new NoSleep()

function enableNoSleep() {
  noSleep.enable()
  document.removeEventListener('touchstart', enableNoSleep, false)
}

export function blockScreenSleep() {
  document.addEventListener('touchstart', enableNoSleep, false)
}

export const showMsgError = (msg: string) => {
  return Swal.fire(trans(msg), undefined, 'error')
}

export const showMsgSuccess = (msg: string) => {
  return Swal.fire(trans(msg), undefined, 'success')
}

export const showMsgConfirm = (msg: string, ops: SweetAlertOptions<any, any> = {}) => {
  return Swal.fire({
    title: trans(msg),
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: trans('button.cancel'),
    confirmButtonText: trans('button.accept'),
    ...ops
  })
}

export const talkText = (msg: string, volume = 1, lang?: string) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(msg)
    u.volume = volume
    // http://www.lingoes.net/en/translator/langcode.htm
    u.lang = lang ?? 'en'
    u.rate = 1
    u.pitch = 1
    speechSynthesis.speak(u)
  } else {
    Swal.fire('Sorry', 'our browser does not support text to speech!')
  }
}

export const getCurrentTimeStamp = () => new Date().getTime().toString().slice(0, -3)

export const getItemRandArray = (array: any[]) => {
  return sample(array)
}

export const getWordNext = (wordsNotStudied: Word[], wordId: string | undefined) => {
  return wordsNotStudied?.find(wordSelected => wordSelected._i > parseInt(wordId || '1')) ?? wordsNotStudied[0]
}

export const changeLnToBr = (phrase: string) => {
  return phrase.replace(/(?:\r\n|\r|\n)/g, '<br />')
}

export const changeLnToPointer = (phrase: string) => {
  return phrase.replace(/(?:\r\n|\r|\n)/g, '. ')
}

export const getArrayFromCollection = <T>(collection: any) => {
  return collection.docs.map((doc: any, i: number) => {
    return { ...doc.data(), id: doc.id, _i: i + 1 }
  }) as T[]
}

export const HTMLReactRender = (html: string | undefined) => {
  return HTMLReactParser(html ?? '')
}

export const capitalizeFirstLetter = (text?: string) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : undefined
}
