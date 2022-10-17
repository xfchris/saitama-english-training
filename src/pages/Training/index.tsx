import { Button, Container, Table } from 'reactstrap'
import TitleH1 from '../../components/TitleH1'
import { trans } from '../../config/i18n'
import Layout from '../../layouts/Layout'
import classNames from 'classnames'
import { useAppSelector } from '../../hooks'
import { selectConfigApp, setStudiedhashWords } from '../../redux/config.slice'
import { useApp } from '../../providers/AppProvider'
import { HTMLReactRender, showMsgConfirm } from '../../utils/helpers'

export default function StartIn() {
  const { dispatch } = useApp()

  const handleRemoveStudiedWords = () => {
    showMsgConfirm('label.confirm').then(response => {
      if (response.isConfirmed) {
        dispatch(setStudiedhashWords([]))
      }
    })
  }

  return (
    <Layout with100={false}>
      <Container>
        <TitleH1 title={trans('label.selectStartWord')} />
        <div className="text-center mb-3">
          <Button onClick={handleRemoveStudiedWords} size="sm">
            {trans('button.removeStudiedWords')}
          </Button>
        </div>
        <AllWordsTable />
      </Container>
    </Layout>
  )
}

function AllWordsTable() {
  const {
    words,
    studiedHashWords,
    configTrain: { studyEnglishToSpanish }
  } = useAppSelector(selectConfigApp)
  const { navigate } = useApp()

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
        {words.map((word, i) => {
          const studied = studiedHashWords?.includes(word.id)
          return (
            <tr key={i} className={classNames('pointer', { 'table-success': studied })} onClick={() => navigate(`/training/${word._i}`)}>
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
