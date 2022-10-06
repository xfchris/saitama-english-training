import { Button, FormGroup, Input, Label } from 'reactstrap'
import { trans } from '../../config/i18n'
import Layout from '../../layouts/Layout'

export default function Index() {
  return (
    <Layout>
      <div className="w-100 d-flex flex-column ">
        <div className="w-100 p-5">
          <div className="text-center mb-4">
            <h2 className="">{trans('SAITAMA ENGLISH TRAINING')}</h2>
            <p className="">Mejora tu ingles repitiendo 1000 oraciones todos los dias</p>
            <img src="/icon.png" />
          </div>
          <div className="d-flex flex-column align-items-center">
            <FormGroup switch>
              <Input type="switch" role="switch" />
              <Label check>{trans('Aprender de ingles a español')}</Label>
            </FormGroup>

            <FormGroup switch>
              <Input type="switch" role="switch" />
              <Label check>{trans('Practicar en modo aleatorio')}</Label>
            </FormGroup>

            <FormGroup switch>
              <Input type="switch" role="switch" />
              <Label check>{trans('Pasar palabras automáticamente')}</Label>
            </FormGroup>

            <Button className="w-250px mt-5" size="lg" color="primary">
              {trans('Start training')}
            </Button>

            <Button className="w-250px mt-5 text-light" size="lg" color="info">
              {trans('Udapte works')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
