import { Button, Card, CardBody, CardHeader, FormGroup, Input, Label, Form } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { trans } from '../config/i18n'
import { firebaseApi } from '../services'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Word } from '../types/config'
import { showMsgError } from '../utils/helpers'
import { useAppDispatch, useAppSelector } from '../hooks'
import { selectConfigApp } from '../redux/config.slice'
import { categories } from '../config/constants'
import { getWords } from '../redux/actions'
import Loading from './Loading'

const schemaValidation = yup
  .object({
    english: yup.string().required(),
    spanish: yup.string().required()
  })
  .required()

type FormWordsProps = {
  idForUpdate: string | null
  setIdForUpdate: Dispatch<SetStateAction<string | null>>
}

const defaultValues = {
  category: '1',
  english: '',
  spanish: ''
}

export default function FormWords({ idForUpdate, setIdForUpdate }: FormWordsProps) {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidation)
  })
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { words } = useAppSelector(selectConfigApp)

  const onSubmit = async (word: Partial<Word>) => {
    try {
      setIsLoading(true)
      await firebaseApi('words').createOrUpdate(idForUpdate, word)
      handleNewWord()
      dispatch(getWords())
    } catch (error) {
      showMsgError('error.firebaseError')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const wordToEdit = words.find(word => word.id === idForUpdate)
    reset(wordToEdit ?? defaultValues)
  }, [idForUpdate])

  const handleNewWord = () => {
    reset(defaultValues)
    setIdForUpdate(null)
  }

  return (
    <Card className="rounded-0 block">
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <span>{trans('label.addWord')}</span>
          <Button onClick={handleNewWord} size="sm">
            {trans('button.newWord')}
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <Label for="cateogry">{trans('label.categories')}</Label>
            <select id="category" className="form-select" {...register('category')}>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <Label for="english">{trans('label.englishWord')}</Label>
            <Controller
              name="english"
              control={control}
              render={({ field }) => <Input rows="3" type="textarea" id="english" invalid={!!errors.english} {...field} />}
            />
          </FormGroup>
          <FormGroup>
            <Label for="spanish">{trans('label.spanishWord')}</Label>
            <Controller
              name="spanish"
              control={control}
              render={({ field }) => <Input rows="3" type="textarea" id="spanish" invalid={!!errors.spanish} {...field} />}
            />
          </FormGroup>
          <p>Id: {idForUpdate}</p>
          <Button type="submit" className="mt-2 w-100" color="success" disabled={isLoading}>
            {isLoading ? <Loading /> : trans('button.saveWord')}
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}
