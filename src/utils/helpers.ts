import Swal, { SweetAlertOptions } from 'sweetalert2'
import { trans } from '../config/i18n'
import { Word } from '../types/config'
import sample from 'lodash.sample'

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
    u.lang = lang ?? 'en-US'
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
