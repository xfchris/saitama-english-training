import { Card, CardHeader, Col, Container, Row } from 'reactstrap'
import Layout from '../../layouts/Layout'
import TitleH1 from '../../components/TitleH1'
import FormWords from '../../components/FormWords'
import { WordsDataTable } from '../../components/WordsDataTable'
import { trans } from '../../config/i18n'

export default function Admin() {
  return (
    <Layout with100={false}>
      <Container>
        <TitleH1 title="Gestión de palabras" />
        <Row className="my-4">
          <Col sm={8}>
            <Card className="rounded-0 mb-3">
              <WordsDataTable />
            </Card>
          </Col>

          <Col sm={4}>
            <FormWords />
            <Card className="rounded-0 mt-4">
              <CardHeader>
                <b>{trans('label.totalWords')}</b> 3123
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
