import { Button, Card, CardBody, CardHeader, FormGroup, Input, Label, Form } from 'reactstrap'
import { trans } from '../../config/i18n'
import Layout from '../../layouts/Layout'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useApp } from '../../providers/AppProvider'
import { useState } from 'react'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'

const schemaValidation = yup
  .object({
    email: yup.string().email(trans('Invalid email')).required(),
    password: yup.string().trim().required('Required').min(8).max(200)
  })
  .required()

const defaultValuesLogin = {
  email: '',
  password: ''
}

type SignInFormValuesType = {
  email: string
  password: string
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValuesLogin,
    resolver: yupResolver(schemaValidation)
  })
  const navigate = useNavigate()

  const { user, signIn, signOut } = useApp()
  const [isLoginLoading, setisLoginLoading] = useState(false)

  const onSubmit = async (data: SignInFormValuesType) => {
    setisLoginLoading(true)
    await signIn(data.email, data.password)
    setisLoginLoading(false)
    navigate('/admin/words')
  }

  if (user === undefined) {
    return null
  }

  return (
    <Layout>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center login">
        <Card className="mb-5 block">
          <CardHeader>{trans('label.loginAdmin')}</CardHeader>
          <CardBody>
            {user ? (
              <Button type="submit" className="mt-2 w-100" color="danger" onClick={() => signOut()}>
                {trans('button.logout')}
              </Button>
            ) : (
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

                <Button type="submit" className="mt-2 w-100" color="primary" disabled={isLoginLoading}>
                  {isLoginLoading ? <Loading /> : trans('button.login')}
                </Button>
              </Form>
            )}
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}
