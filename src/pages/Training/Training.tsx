import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge, Button, Fade, Progress } from 'reactstrap'
import { useInterval } from 'usehooks-ts'
import { MAX_PROGRESS_PERCENT } from '../../config/constants'
import { trans } from '../../config/i18n'
import { useAppSelector } from '../../hooks'
import Layout from '../../layouts/Layout'
import { useApp } from '../../providers/AppProvider'
import { addStudiedWord, selectConfigApp, setStudiedhashWords } from '../../redux/config.slice'
import { changeLnToPointer, getItemRandArray, getWordNext, HTMLReactRender, showMsgError, showMsgSuccess, talkText } from '../../utils/helpers'

export default function Training() {
  const { wordId } = useParams()
  const {
    words,
    studiedHashWords,
    configTrain: { studyRandomMode, studyEnglishToSpanish, velocityStudyAutomatic }
  } = useAppSelector(selectConfigApp)
  const { navigate, dispatch, handleAutomaticStudy, studyAutomatic, user } = useApp()
  const [showResult, setShowResult] = useState(false)
  const [runAutomaticTime, setRunAutomaticTime] = useState(false)
  const [percentAutomaticBar, setPercentAutomaticBar] = useState(MAX_PROGRESS_PERCENT)
  const word = wordId ? words.find(w => w._i === parseInt(wordId)) : undefined

  useInterval(
    () => {
      setPercentAutomaticBar(prev => {
        const sum = 3 * velocityStudyAutomatic
        return showResult ? prev + sum : prev - velocityStudyAutomatic
      })
      if ((!showResult && percentAutomaticBar <= -20) || (showResult && percentAutomaticBar >= MAX_PROGRESS_PERCENT)) {
        handleResult()
      }
    },
    runAutomaticTime ? 30 : null
  )

  useEffect(() => {
    if (word) {
      setRunAutomaticTime(studyAutomatic)
    }
  }, [studyAutomatic])

  if (!word) {
    showMsgError('error.wordNotExist').then(() => navigate('/training', { replace: true }))
    return null
  }

  const readCurrentText = () => {
    talkText(changeLnToPointer(word.english))
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
        setRunAutomaticTime(false)
        showMsgSuccess('info.allWordsStudied').then(() => {
          dispatch(setStudiedhashWords([]))
          setShowResult(false)
          navigate('/', { replace: true })
        })
      } else {
        const nextWord = studyRandomMode ? getItemRandArray(wordsNotStudied) : getWordNext(wordsNotStudied, wordId)
        setShowResult(false)
        navigate(`/training/${nextWord._i}`, { replace: true })
      }
    }
  }

  const handleBack = () => {
    setShowResult(false)
    const studiedHashWordsFiltered = studiedHashWords.filter(hash => hash !== word.id)
    if (!studiedHashWordsFiltered) {
      navigate('/training/1', { replace: true })
    } else {
      const backHash = studiedHashWordsFiltered.pop()
      const backWord = words.find(wordSelected => wordSelected.id === backHash)
      dispatch(setStudiedhashWords(studiedHashWordsFiltered))
      navigate(`/training/${backWord?._i || 1}`, { replace: true })
    }
  }

  return (
    <Layout>
      <div className="w-100 d-flex flex-column justify-content-between">
        <div className="row m-1">
          <div className="col-4">
            <Badge># {wordId}</Badge>
          </div>
          <div className="col-4 text-center">
            {user && (
              <Link className="text-decoration-none" to={`/admin/words/${word.id}`}>
                {trans('label.edit')}
              </Link>
            )}
          </div>
          <div className="col-4 text-end">
            <Badge>
              {trans('label.nStudiesToday')} {studiedHashWords.length}
            </Badge>
          </div>
        </div>

        <div className="w-100 text-center">
          <Fade>
            <h3 className="mb-4">{HTMLReactRender(studyEnglishToSpanish ? word.englishHtml : word.spanishHtml)}</h3>
          </Fade>
          {showResult && (
            <Fade>
              <h3 className="text-secondary">{HTMLReactRender(studyEnglishToSpanish ? word.spanishHtml : word.englishHtml)}</h3>
            </Fade>
          )}
        </div>
        <div className="h-80px"></div>
        <div className="w-100 d-flex justify-content-center position-absolute bottom-0">
          <div className="w-100 w-sm-50 d-flex flex-column">
            {studyAutomatic && (
              <Fade>
                <Progress className="rounded-0 animation-progress-ms" color="warning" animated striped value={percentAutomaticBar} />
              </Fade>
            )}

            <div className="w-100 d-flex h-60px">
              <Button onClick={handleResult} className="w-100 rounded-0 border-0 text-btn-color" size="sm" color="primary">
                {showResult ? trans('button.next') : trans('button.result')}
              </Button>
              <Button
                onClick={readCurrentText}
                className="w-100 rounded-0 border-0 border-start border-end text-btn-color border-light"
                size="sm"
                color="success"
              >
                {trans('button.soundPlay')}
              </Button>
              <Button
                onClick={handleBack}
                className="w-100 rounded-0 border-0 text-btn-color"
                size="sm"
                color="danger"
                disabled={!studiedHashWords.length}
              >
                {trans('button.back')}
              </Button>
              <Button
                onClick={handleAutomaticStudy}
                className="w-100 rounded-0 border-start border-0 text-btn-color  text-light"
                size="sm"
                color="secondary"
              >
                {studyAutomatic ? trans('button.pause') : trans('button.play')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
