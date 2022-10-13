import { Card, Col, Container, Row } from 'reactstrap'
import Layout from '../../layouts/Layout'
import TitleH1 from '../../components/TitleH1'
import FormWords from '../../components/FormWords'
import { WordsDataTable } from '../../components/WordsDataTable'
import { trans } from '../../config/i18n'
import { useApp } from '../../providers/AppProvider'
import { useState } from 'react'

export default function Admin() {
  const { navigate, user } = useApp()
  const [idForUpdate, setIdForUpdate] = useState<string | null>(null)

  if (user === null) {
    navigate('/login')
    return null
  }

  return (
    <Layout with100={false}>
      <Container fluid>
        <TitleH1 title={trans('label.wordsManage')} />
        <Row className="my-4">
          <Col sm={8}>
            <WordsDataTable setIdForUpdate={setIdForUpdate} />
          </Col>

          <Col sm={4}>
            <FormWords idForUpdate={idForUpdate} setIdForUpdate={setIdForUpdate} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
