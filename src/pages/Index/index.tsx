import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Fade, FormGroup, Input, Label } from 'reactstrap'
import Loading from '../../components/Loading'
import Layout from '../../layouts/Layout'
import { trans } from '../../config/i18n'
import { useAppSelector } from '../../hooks'
import { getWords } from '../../redux/actions'
import {
  selectConfigApp,
  setChangeVelocityAutomatic,
  setStudyAutomatic,
  setStudyEnglishToSpanish,
  setStudyRandomMode
} from '../../redux/config.slice'
import { showMsgError } from '../../utils/helpers'
import { useApp } from '../../providers/AppProvider'

export default function Index() {
  const { dispatch } = useApp()
  const [isUpdateWordsLoading, setisUpdateWordsLoading] = useState(false)
  const { words, configTrain } = useAppSelector(selectConfigApp)

  const handleUpdateWords = async () => {
    setisUpdateWordsLoading(true)
    try {
      await dispatch(getWords())
    } catch (error) {
      showMsgError('error.firebaseError')
    }
    setisUpdateWordsLoading(false)
  }

  const handleChangeVAutomatic = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setChangeVelocityAutomatic(parseInt(e.target.value)))
  }

  return (
    <Layout>
      <div className="w-100 d-flex flex-column pt-3">
        <div className="w-100 py-3 px-4">
          <div className="text-center mb-4">
            <h2 className="">{trans('label.textLogoLarge')}</h2>
            <p className="">{trans('label.textLogoLargeSlogan')}</p>
            <img className="my-2" src="/icon.png" />
          </div>
          <div className="d-flex flex-column align-items-center">
            <FormGroup className="mt-2" switch onClick={() => dispatch(setStudyEnglishToSpanish(!configTrain.studyEnglishToSpanish))}>
              <Input type="switch" checked={configTrain.studyEnglishToSpanish} readOnly />
              <Label check>{trans('label.learnEnglishToSpanish')}</Label>
            </FormGroup>
            <FormGroup className="mt-2" switch onClick={() => dispatch(setStudyRandomMode(!configTrain.studyRandomMode))}>
              <Input type="switch" checked={configTrain.studyRandomMode} readOnly />
              <Label check>{trans('label.randomMode')}</Label>
            </FormGroup>
            <FormGroup className="mt-2" switch onClick={() => dispatch(setStudyAutomatic(!configTrain.studyAutomatic))}>
              <Input type="switch" checked={configTrain.studyAutomatic} readOnly />
              <Label check>{trans('label.automaticLearn')}</Label>
            </FormGroup>

            {configTrain.studyAutomatic && (
              <Fade>
                <div className="mt-2">
                  <Label check>{trans('label.velocityAutomatic')}</Label>
                  <Input
                    bsSize="sm"
                    type="select"
                    className="selectVAutomatic"
                    defaultValue={configTrain.velocityStudyAutomatic}
                    onChange={handleChangeVAutomatic}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2+</option>
                    <option value={3}>3+</option>
                    <option value={4}>4+</option>
                    <option value={5}>5+</option>
                  </Input>
                </div>
              </Fade>
            )}

            <Link className="w-250px mt-5 btn btn-primary btn-lg" to="training" color="primary">
              {trans('label.startTraining')}
            </Link>
            <Button onClick={handleUpdateWords} className="w-250px mt-4 text-light" size="lg" color="info" disabled={isUpdateWordsLoading}>
              {isUpdateWordsLoading ? <Loading size="22" /> : trans('label.updateWords')}
            </Button>
            {words && `${trans('label.totalWords')} ${words.length}`}
          </div>
        </div>
      </div>
    </Layout>
  )
}
