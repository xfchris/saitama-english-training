import { Button, Container, Table } from 'reactstrap'
import TitleH1 from '../../components/TitleH1'
import { trans } from '../../config/i18n'
import Layout from '../../layouts/Layout'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { selectConfigApp, setStudiedhashWords } from '../../redux/config.slice'
import { useApp } from '../../providers/AppProvider'
import { showMsgConfirm } from '../../utils/helpers'

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
  const { words, studiedHashWords } = useAppSelector(selectConfigApp)

  return (
    <Table className="mb-4 border" bordered hover responsive size="sm">
      <thead>
        <tr className="table-dark">
          <th className="w-5px">#</th>
          <th>{trans('label.english')}</th>
          <th className="w-50 d-none d-sm-table-cell">{trans('label.spanish')}</th>
        </tr>
      </thead>
      <tbody>
        {words.map((word, i) => {
          const studied = studiedHashWords?.includes(word.id)
          return (
            <tr key={i} className={classNames({ 'table-success': studied })}>
              <th scope="row">{word._i}</th>
              <td>
                <Link className="text-decoration-none" to={`/training/${word._i}`}>
                  {word.english}
                </Link>
              </td>

              <td className="d-none d-sm-table-cell">
                <Link className="text-decoration-none" to={`/training/${word._i}`}>
                  {word.spanish}
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
