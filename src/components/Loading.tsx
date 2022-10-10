import { Fade, Spinner } from 'reactstrap'

export default function Loading() {
  return (
    <Fade>
      <Spinner size="sm">Loading...</Spinner>
    </Fade>
  )
}
