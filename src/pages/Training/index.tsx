import React from 'react'
import { Container, Table } from 'reactstrap'
import TitleH1 from '../../components/TitleH1'
import { trans } from '../../config/i18n'
import Layout from '../../layouts/Layout'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export default function StartIn() {
  return (
    <Layout with100={false}>
      <Container>
        <TitleH1 title="Selecciona desde donde quieres comenzar hoy" />
        <AllWordsTable />
      </Container>
    </Layout>
  )
}
type WordsType = {
  [hash: string]: any
}
const fakeData: WordsType = {
  hash1: {
    id: 1,
    english: 'Pardon me, do you know where Central Park is?',
    spanish: 'Disculpe, ¿sabe dónde está Central Park?',
    createdAt: '2020-07-21 10:44:05',
    studied: true
  }
}

for (let i = 0; i < 100; i++) {
  const newData: any = { ...fakeData.hash1 }
  newData.id = i + 1
  fakeData[`hash${i + 1}`] = newData
}

function AllWordsTable() {
  return (
    <Table className="mb-4 border" bordered hover responsive size="sm">
      <thead>
        <tr className="table-dark">
          <th>#</th>
          <th className="w-100">{trans('label.english')}</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(fakeData).map((key, i) => {
          const data = fakeData[key]
          return (
            <tr key={i} className={classNames({ 'table-success': data.studied })}>
              <th scope="row">{data.id}</th>
              <td>
                <Link className="text-decoration-none" to={`/training/${key}`}>
                  {data.english}
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
