import { Badge, Button, Progress } from 'reactstrap'
import { SoundWaveIcon } from '../../components/Icons'
import Layout from '../../layouts/Layout'
import { talkText } from '../../utils/helpers'

export default function Training() {
  const readCurrentText = () => {
    talkText('The bank is on the corner of Pine Street and First Street.')
    console.log('leyendo texto')
  }

  return (
    <Layout>
      <div className="w-100 d-flex flex-column justify-content-between">
        <div className="w-100 d-flex justify-content-between p-2">
          <Badge># 235</Badge>
          <Badge>N per day: 89</Badge>
        </div>

        <div className="w-100 text-center">
          <h3 className="mb-4">The bank is on the corner of Pine Street and First Street.</h3>
          <h3 className="text-secondary">El banco está en la esquina de Pine Street y First Street.</h3>
        </div>
        <div className="h-80px"></div>
        <div className="w-100 d-flex justify-content-center position-absolute bottom-0">
          <div className="w-100 w-sm-50 d-flex flex-column">
            <Progress className="rounded-0" color="warning" animated striped value={41} />
            <div className="w-100 d-flex h-80px">
              <Button className="w-100 rounded-0 border-0 text-btn-color" size="lg" color="primary">
                Result
              </Button>
              <Button
                onClick={readCurrentText}
                className="w-100 rounded-0 border-0 border-start border-end text-btn-color border-light"
                size="lg"
                color="success"
              >
                Play <SoundWaveIcon />
              </Button>
              <Button className="w-100 rounded-0 border-0 text-btn-color" size="lg" color="danger">
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
