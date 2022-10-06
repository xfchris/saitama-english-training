import Swal from 'sweetalert2'

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
