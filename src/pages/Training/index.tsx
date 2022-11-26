import { Button, Card, CardBody, Container, Table } from 'reactstrap'
import TitleH1 from '../../components/TitleH1'
import { trans } from '../../config/i18n'
import Layout from '../../layouts/Layout'
import classNames from 'classnames'
import { useAppSelector } from '../../hooks'
import { selectConfigApp, setStudiedhashWords } from '../../redux/config.slice'
import { useApp } from '../../providers/AppProvider'
import { blockScreenSleep, HTMLReactRender, noSleep, showMsgConfirm } from '../../utils/helpers'
import { ChangeEvent, useEffect } from 'react'
import { GROUP_TYPES } from '../../config/constants'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function StartIn() {
  const { groupHashWords } = useAppSelector(selectConfigApp)
  useTranslation()

  useEffect(() => {
    noSleep.disable()
  }, [])

  return (
    <Layout with100={false}>
      <Container>
        <TitleH1 title={trans('label.selectStartWord')} />

        <div className="d-flex justify-content-center mb-3">
          <TrainingOptions />
        </div>
        {groupHashWords.map((groupHash, i) => (
          <div key={i}>
            <h4>Grupo {i + 1}</h4>
            <AllWordsTable hashWords={groupHash} groupIndex={i} />
          </div>
        ))}
      </Container>
    </Layout>
  )
}

export function TrainingOptions() {
  const { dispatch, handleGroupWords } = useApp()
  const { orderTypeEstablished } = useAppSelector(selectConfigApp)

  const handleRemoveStudiedWords = () => {
    showMsgConfirm('label.confirm').then(response => {
      if (response.isConfirmed) {
        dispatch(setStudiedhashWords([]))
      }
    })
  }

  const handleChangeGroupWords = (e: ChangeEvent<HTMLSelectElement>) => {
    handleGroupWords(parseInt(e.target.value))
  }

  return (
    <Card className="my-2 w-100 mw-650px">
      <CardBody>
        <div className="row">
          <div className="col-sm-6">
            <Button onClick={handleRemoveStudiedWords} size="sm" className="mb-3 mb-sm-0">
              {trans('button.removeStudiedWords')}
            </Button>
          </div>
          <div className="col-sm-6">
            <div className="input-group input-group-sm">
              <span className="input-group-text">{trans('label.studyBy')}</span>
              <select className="form-select bg-light form-select-sm" value={orderTypeEstablished} onChange={handleChangeGroupWords}>
                {GROUP_TYPES.map((groupName, key) => (
                  <option key={key} value={key}>
                    {groupName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

type AllWordsTableType = {
  hashWords: string[]
  groupIndex: number
}

function AllWordsTable({ hashWords, groupIndex }: AllWordsTableType) {
  const {
    words,
    studiedHashWords,
    configTrain: { studyEnglishToSpanish }
  } = useAppSelector(selectConfigApp)
  const navigate = useNavigate()

  return (
    <Table className="mb-4 border rounded" bordered hover responsive>
      <thead>
        <tr className="table-dark">
          <th className="w-5px">#</th>
          <th>{studyEnglishToSpanish ? trans('label.english') : trans('label.spanish')}</th>
          <th className="w-50 d-none d-sm-table-cell">{studyEnglishToSpanish ? trans('label.spanish') : trans('label.english')}</th>
        </tr>
      </thead>
      <tbody>
        {words
          .filter(word => hashWords.includes(word.id))
          .map(word => {
            const studied = studiedHashWords?.includes(word.id)
            return (
              <tr
                key={word.id}
                className={classNames('pointer', { 'table-success': studied })}
                onClick={() => {
                  navigate(`/training/group/${groupIndex}/word/${word._i}`)
                  blockScreenSleep()
                }}
              >
                <th scope="row">{word._i}</th>
                <td>{HTMLReactRender(studyEnglishToSpanish ? word.englishHtml : word.spanishHtml)}</td>
                <td className="d-none d-sm-table-cell">{HTMLReactRender(studyEnglishToSpanish ? word.spanishHtml : word.englishHtml)}</td>
              </tr>
            )
          })}
      </tbody>
    </Table>
  )
}
