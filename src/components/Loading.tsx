import { Spinner } from 'reactstrap'

type LoadingProps = {
  size?: string
}
export default function Loading({ size = '18' }: LoadingProps) {
  return <Spinner style={{ width: `${size}px`, height: `${size}px`, marginTop: '3px' }}>Loading...</Spinner>
}
