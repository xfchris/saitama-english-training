import { Button, Card, CardBody, CardHeader, FormGroup, Input, Label, Form } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { trans } from '../config/i18n'

const schemaValidation = yup
  .object({
    english: yup.string().required(),
    password: yup.string().required()
  })
  .required()

export default function FormWords() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      english: '',
      spanish: ''
    },
    resolver: yupResolver(schemaValidation)
  })

  const onSubmit = (data: any) => console.log(data)

  return (
    <Card className="rounded-0 block">
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <span>{trans('label.addWord')}</span>
          <Button size="sm">{trans('button.newWord')}</Button>
        </div>
      </CardHeader>
      <CardBody>
        <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <Label for="english">{trans('label.englishWord')}</Label>
            <Controller
              name="english"
              control={control}
              render={({ field }) => <Input rows="4" type="textarea" id="english" invalid={!!errors.english} {...field} />}
            />
          </FormGroup>
          <FormGroup>
            <Label for="spanish">{trans('label.spanishWord')}</Label>
            <Controller
              name="spanish"
              control={control}
              render={({ field }) => <Input rows="4" type="textarea" id="spanish" invalid={!!errors.spanish} {...field} />}
            />
          </FormGroup>
          <p>Id: 234234234</p>
          <Button type="submit" className="mt-2 w-100" color="success">
            {trans('button.saveWord')}
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}
