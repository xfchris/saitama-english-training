import { Alert } from 'reactstrap'
import { trans } from '../config/i18n'

type AlertNoRecordsProps = {
  title: string
}

export default function AlertNoRecords({ title }: AlertNoRecordsProps) {
  return (
    <Alert className="py-2" color="primary">
      <div className="alert-body">
        <span>{trans(title)}</span>
      </div>
    </Alert>
  )
}
