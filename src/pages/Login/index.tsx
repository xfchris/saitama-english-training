import { Button, Card, CardBody, CardHeader, FormGroup, Input, Label, Form } from 'reactstrap'
import { trans } from '../../config/i18n'
import Layout from '../../layouts/Layout'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schemaValidation = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required()

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schemaValidation)
  })

  const onSubmit = (data: any) => console.log(data)

  return (
    <Layout>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center login">
        <Card className="mb-5 block">
          <CardHeader>{trans('label.loginAdmin')}</CardHeader>
          <CardBody>
            <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormGroup>
                <Label for="email">{trans('label.email')}</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input type="email" id="email" invalid={!!errors.email} {...field} />}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">{trans('label.password')}</Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <Input type="password" id="password" invalid={!!errors.password} {...field} />}
                />
              </FormGroup>

              <Button type="submit" className="mt-2" color="primary">
                {trans('button.login')}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}
