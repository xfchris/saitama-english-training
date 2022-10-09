import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { trans } from '../../config/i18n'
import { useAppDispatch, useAppSelector } from '../../hooks'
import Layout from '../../layouts/Layout'
import { getWords, selectConfigApp } from '../../redux/config.slice'
import { showMsgError } from '../../utils/helpers'

export default function Index() {
  const dispatch = useAppDispatch()
  const [isUpdateWordsLoading, setisUpdateWordsLoading] = useState(false)
  const { words } = useAppSelector(selectConfigApp)

  const handleUpdateWords = async () => {
    setisUpdateWordsLoading(true)
    try {
      await dispatch(getWords())
    } catch (error) {
      console.log(error)
      showMsgError('error.firebaseError')
    }
    setisUpdateWordsLoading(false)
  }
  return (
    <Layout>
      <div className="w-100 d-flex flex-column">
        <div className="w-100 p-5">
          <div className="text-center mb-4">
            <h2 className="">{trans('label.textLogoLarge')}</h2>
            <p className="">{trans('label.textLogoLargeSlogan')}</p>
            <img src="/icon.png" />
          </div>
          <div className="d-flex flex-column align-items-center">
            <FormGroup switch>
              <Input type="switch" role="switch" />
              <Label check>{trans('label.learnEnglishToSpanish')}</Label>
            </FormGroup>
            <FormGroup switch>
              <Input type="switch" role="switch" />
              <Label check>{trans('label.randomMode')}</Label>
            </FormGroup>
            <FormGroup switch>
              <Input type="switch" role="switch" />
              <Label check>{trans('label.automaticLearn')}</Label>
            </FormGroup>
            <Link className="w-250px mt-5 btn btn-primary btn-lg" to="training" color="primary">
              {trans('label.startTraining')}
            </Link>
            <Button onClick={handleUpdateWords} className="w-250px mt-5 text-light" size="lg" color="info" disabled={isUpdateWordsLoading}>
              {isUpdateWordsLoading ? 'Espere... ' : trans('label.updateWords')}
            </Button>
            {trans('label.totalWords')} {words.length}
          </div>
        </div>
      </div>
    </Layout>
  )
}
