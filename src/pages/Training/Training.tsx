import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  const { wordId, groupId } = useParams()
  const {
    words,
    studiedHashWords,
    configTrain: { studyRandomMode, studyEnglishToSpanish, velocityStudyAutomatic },
    groupHashWords,
    orderTypeEstablished
  } = useAppSelector(selectConfigApp)
  const navigate = useNavigate()
  const { dispatch, handleAutomaticStudy, studyAutomatic, user } = useApp()
  const [showResult, setShowResult] = useState(false)
  const [runAutomaticTime, setRunAutomaticTime] = useState(false)
  const [percentAutomaticBar, setPercentAutomaticBar] = useState(MAX_PROGRESS_PERCENT)
  const word = wordId ? words.find(w => w._i === parseInt(wordId)) : undefined
  const groupHashWordsSelected = groupHashWords[parseInt(groupId || '0')]
  const groupWords = words.filter(word => groupHashWordsSelected.includes(word.id))
  const [groupWordsStudied, setGroupWordsStudied] = useState(groupWords.length)

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
    runAutomaticTime ? 90 : null
  )

  useEffect(() => {
    if (word) {
      setRunAutomaticTime(studyAutomatic)
    }
  }, [studyAutomatic])

  useEffect(() => {
    getWordsNotStudied()
  }, [])

  if (!word) {
    showMsgError('error.wordNotExist').then(() => navigate('/training', { replace: true }))
    return null
  }

  const readCurrentText = () => {
    talkText(changeLnToPointer(word.english))
  }

  const handleNotWordsStudied = (studiedWords: string[]) => {
    const wordStudiedOutGroup = studiedWords.reduce((out: string[], studiedWord) => {
      if (!groupHashWordsSelected.includes(studiedWord)) {
        out.push(studiedWord)
      }
      return out
    }, [])
    if (orderTypeEstablished !== 0) {
      dispatch(setStudiedhashWords(wordStudiedOutGroup))
      setShowResult(false)
      navigate(`/training/group/${groupId}/word/${groupWords[0]._i}`, { replace: true })
    } else {
      setRunAutomaticTime(false)
      showMsgSuccess('info.allWordsStudied').then(() => {
        dispatch(setStudiedhashWords(wordStudiedOutGroup))
        setShowResult(false)
        navigate('/training', { replace: true })
      })
    }
  }

  const getWordsNotStudied = () => {
    const wordsNotStudied = groupWords?.filter(word => !studiedHashWords.includes(word.id))
    setGroupWordsStudied(wordsNotStudied.length)
    return wordsNotStudied
  }

  const handleResult = () => {
    if (!showResult) {
      readCurrentText()
      setShowResult(true)
      dispatch(addStudiedWord(word.id))
    } else {
      const studiedWords = [...studiedHashWords, word.id]
      const wordsNotStudied = getWordsNotStudied()
      if (!wordsNotStudied?.length) {
        handleNotWordsStudied(studiedWords)
      } else {
        const nextWord = studyRandomMode ? getItemRandArray(wordsNotStudied) : getWordNext(wordsNotStudied, wordId)
        setShowResult(false)
        navigate(`/training/group/${groupId}/word/${nextWord._i}`, { replace: true })
      }
    }
  }

  const handleBack = () => {
    setShowResult(false)
    const studiedHashWordsFiltered = studiedHashWords.filter(hash => hash !== word.id)
    if (!studiedHashWordsFiltered) {
      navigate('/training/group/0/word/1', { replace: true })
    } else {
      const backHash = studiedHashWordsFiltered.pop()
      const backWord = words.find(wordSelected => wordSelected.id === backHash)
      dispatch(setStudiedhashWords(studiedHashWordsFiltered))
      navigate(`/training/group/${groupId}/word/${backWord?._i || 1}`, { replace: true })
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

        <div className="w-100 text-center px-1">
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
                <Progress className="rounded-0 animation-progress-ms h-10px" color="warning" animated striped value={percentAutomaticBar} />
              </Fade>
            )}
            <Progress max={groupWords.length} className="rounded-0 h-10px" color="primary" value={groupWords.length - groupWordsStudied} />
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
