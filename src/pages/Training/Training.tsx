import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Button, Fade, Progress } from 'reactstrap'
import { SoundWaveIcon } from '../../components/Icons'
import { trans } from '../../config/i18n'
import { useAppSelector } from '../../hooks'
import Layout from '../../layouts/Layout'
import { useApp } from '../../providers/AppProvider'
import { addStudiedWord, selectConfigApp, setStudiedhashWords } from '../../redux/config.slice'
import { getItemRandArray, getWordNext, showMsgError, showMsgSuccess, talkText } from '../../utils/helpers'

export default function Training() {
  const { wordId } = useParams()
  const {
    words,
    studiedHashWords,
    configTrain: { studyRandomMode, studyEnglishToSpanish }
  } = useAppSelector(selectConfigApp)
  const { navigate, dispatch } = useApp()
  const [showResult, setShowResult] = useState(false)

  const word = wordId ? words.find(w => w._i === parseInt(wordId)) : undefined

  if (!word) {
    showMsgError('error.wordNotExist').then(() => navigate('/training'))
    return null
  }

  const readCurrentText = () => {
    talkText(word.english)
  }

  const handleResult = () => {
    if (!showResult) {
      readCurrentText()
      setShowResult(true)
      dispatch(addStudiedWord(word.id))
    } else {
      const studiedWords = [...studiedHashWords, word.id]
      const wordsNotStudied = words?.filter(word => !studiedWords.includes(word.id))

      if (!wordsNotStudied?.length) {
        showMsgSuccess('info.allWordsStudied').then(() => {
          dispatch(setStudiedhashWords([]))
          setShowResult(false)
          navigate('/')
        })
      } else {
        const nextWord = studyRandomMode ? getItemRandArray(wordsNotStudied) : getWordNext(wordsNotStudied, wordId)
        setShowResult(false)
        navigate(`/training/${nextWord._i}`)
      }
    }
  }

  const handleBack = () => {
    setShowResult(false)
    const studiedHashWordsFiltered = studiedHashWords.filter(hash => hash !== word.id)
    if (!studiedHashWordsFiltered) {
      navigate('/training/1')
    } else {
      const backHash = studiedHashWordsFiltered.pop()
      const backWord = words.find(wordSelected => wordSelected.id === backHash)
      dispatch(setStudiedhashWords(studiedHashWordsFiltered))
      navigate(`/training/${backWord?._i || 1}`)
    }
  }

  return (
    <Layout>
      <div className="w-100 d-flex flex-column justify-content-between">
        <div className="w-100 d-flex justify-content-between p-2">
          <Badge># {wordId}</Badge>
          <Badge>
            {trans('label.nStudiesToday')} {studiedHashWords.length}
          </Badge>
        </div>

        <div className="w-100 text-center">
          <Fade>
            <h3 className="mb-4">{studyEnglishToSpanish ? word.english : word.spanish}</h3>
          </Fade>
          {showResult && (
            <Fade>
              <h3 className="text-secondary">{studyEnglishToSpanish ? word.spanish : word.english}</h3>
            </Fade>
          )}
        </div>
        <div className="h-80px"></div>
        <div className="w-100 d-flex justify-content-center position-absolute bottom-0">
          <div className="w-100 w-sm-50 d-flex flex-column">
            <Progress className="rounded-0" color="warning" animated striped value={41} />
            <div className="w-100 d-flex h-80px">
              <Button onClick={handleResult} className="w-100 rounded-0 border-0 text-btn-color" size="lg" color="primary">
                {showResult ? trans('button.next') : trans('button.result')}
              </Button>
              <Button
                onClick={readCurrentText}
                className="w-100 rounded-0 border-0 border-start border-end text-btn-color border-light"
                size="lg"
                color="success"
              >
                {trans('button.soundPlay')} <SoundWaveIcon />
              </Button>
              <Button
                onClick={handleBack}
                className="w-100 rounded-0 border-0 text-btn-color"
                size="lg"
                color="danger"
                disabled={!studiedHashWords.length}
              >
                {trans('button.back')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
