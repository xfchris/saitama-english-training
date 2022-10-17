import { Col, Container, Row } from 'reactstrap'
import Layout from '../../layouts/Layout'
import TitleH1 from '../../components/TitleH1'
import FormWords from '../../components/FormWords'
import { WordsDataTable } from '../../components/WordsDataTable'
import { trans } from '../../config/i18n'
import { useApp } from '../../providers/AppProvider'
import { useParams } from 'react-router-dom'

export default function Admin() {
  const { navigate, user } = useApp()
  const { idHash } = useParams()

  if (user === null) {
    navigate('/login')
    return null
  }

  return (
    <Layout with100={false}>
      <Container fluid>
        <TitleH1 title={trans('label.wordsManage')} />
        <Row className="my-3">
          <Col sm={8}>
            <WordsDataTable />
          </Col>

          <Col sm={4}>
            <FormWords idForUpdate={idHash} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
