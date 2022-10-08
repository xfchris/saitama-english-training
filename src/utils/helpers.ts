import Swal from 'sweetalert2'
import * as yup from 'yup'

export const getToken = () => localStorage.getItem('token')

export function talkText(msg: string, lang?: string) {
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

export const passwordValidation = yup.string().trim().required('Required').min(8).max(200)
