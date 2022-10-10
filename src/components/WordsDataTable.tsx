import { Link } from 'react-router-dom'
import { trans } from '../config/i18n'
import AlertNoRecords from './AlertNoRecords'
import DataTable, { TableStyles } from 'react-data-table-component'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { Dispatch, SetStateAction } from 'react'
import { Word } from '../types/config'
import { useAppDispatch, useAppSelector } from '../hooks'
import { selectConfigApp } from '../redux/config.slice'
import { firebaseApi } from '../services'
import { showMsgConfirm, showMsgError, showMsgSuccess } from '../utils/helpers'
import { getWords } from '../redux/actions'

const fakeData: Word[] = [
  {
    id: '1',
    category: '1',
    english: 'Pardon me, do you know where Central Park is?',
    spanish: 'Disculpe, ¿sabe dónde está Central Park?',
    createdAt: 123123
  }
]
for (let i = 0; i < 100; i++) {
  const newData = { ...fakeData[0] }
  newData.id = `${i + 2}`
  fakeData.push(newData)
}

type WordsDataTableProps = {
  setIdForUpdate: Dispatch<SetStateAction<string | null>>
}

export function WordsDataTable({ setIdForUpdate }: WordsDataTableProps) {
  const { words } = useAppSelector(selectConfigApp)
  const dispatch = useAppDispatch()

  if (!words || !words.length) {
    return <AlertNoRecords title="label.noRecords" />
  }

  const removeWord = (id: string) => {
    showMsgConfirm('label.confirm').then(result => {
      if (result.isConfirmed) {
        firebaseApi('words')
          .remove(id)
          .then(() => {
            dispatch(getWords())
            showMsgSuccess('label.completed')
          })
          .catch(() => showMsgError('error.firebaseError'))
      }
    })
  }

  const tableColumns = [
    {
      name: trans('label.id'),
      width: '10%',
      sortable: true,
      selector: (row: Word) => row.id,
      cell: (row: Word, index: number) => {
        const link = `/words/${row.id}`
        return (
          <Link className="text-decoration-none fw-bold text-danger" to={link} title={row.id}>
            {index}
          </Link>
        )
      }
    },
    {
      id: 'name',
      name: trans('label.english'),
      sortable: true,
      selector: (row: Word) => row.english
    },
    {
      name: trans('label.spanish'),
      sortable: true,
      selector: (row: Word) => row.spanish
    },
    {
      sortable: false,
      width: '92px',
      cell: (row: Word) => {
        return (
          <>
            <UncontrolledDropdown size="sm">
              <DropdownToggle caret>{trans('label.options')}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setIdForUpdate(row.id)}>{trans('label.edit')}</DropdownItem>
                <DropdownItem onClick={() => removeWord(row.id)}>{trans('label.remove')}</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        )
      }
    }
  ]

  return (
    <div className="react-dataTable react-dataTable-body-transparent">
      <DataTable
        pagination
        data={words}
        columns={tableColumns}
        className="react-dataTable"
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        customStyles={customStyles}
        defaultSortAsc={true}
      />
    </div>
  )
}

const customStyles: TableStyles = {
  headCells: {
    style: {
      fontSize: '0.857rem'
    }
  },
  cells: {
    style: {
      backgroundColor: '#EEE'
    }
  },
  rows: {
    style: {
      backgroundColor: '#f8f8f8'
    }
  }
}
