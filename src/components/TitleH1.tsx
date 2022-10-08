import { trans } from '../config/i18n'

type TitleH1Props = {
  title?: string
  withTrans?: boolean
}

export default function TitleH1({ title = '', withTrans = true }: TitleH1Props) {
  return (
    <div className="pt-1 pb-1 text-center">
      <h3>{withTrans ? trans(title) : title}</h3>
    </div>
  )
}
