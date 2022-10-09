import Swal from 'sweetalert2'
import { trans } from '../config/i18n'

export const showMsgError = (msg: string) => {
  return Swal.fire(trans(msg), undefined, 'error')
}

export const showMsgSuccess = (msg: string) => {
  return Swal.fire(trans(msg), undefined, 'success')
}

export const showMsgConfirm = (msg: string) => {
  return Swal.fire({
    title: trans(msg),
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: trans('button.cancel'),
    confirmButtonText: trans('button.accept')
  })
}

export const talkText = (msg: string, lang?: string) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(msg)
    u.lang = lang ?? 'en-US'
    u.rate = 1
    u.pitch = 0.9
    speechSynthesis.speak(u)
  } else {
    Swal.fire('Sorry', 'our browser does not support text to speech!')
  }
}

export const getCurrentTimeStamp = () => new Date().getTime().toString().slice(0, -3)
