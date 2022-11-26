import { Link, useNavigate } from 'react-router-dom'
import { trans } from '../config/i18n'
import AlertNoRecords from './AlertNoRecords'
import DataTable, { TableStyles } from 'react-data-table-component'
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { Word } from '../types/config'
import { useAppSelector } from '../hooks'
import { selectConfigApp } from '../redux/config.slice'
import { firebaseApi } from '../services'
import { showMsgConfirm, showMsgError, showMsgSuccess, HTMLReactRender } from '../utils/helpers'
import { getWords } from '../redux/actions'
import { useApp } from '../providers/AppProvider'

export function WordsDataTable() {
  const { words } = useAppSelector(selectConfigApp)
  const navigate = useNavigate()
  const { dispatch } = useApp()

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
      id: 'id',
      name: trans('label.id'),
      width: '10%',
      sortable: true,
      selector: (row: Word) => row._i,
      cell: (row: Word) => {
        const link = `/training/group/0/word/${row._i}`
        return (
          <Link className="text-decoration-none fw-bold text-danger" to={link} title={row.id}>
            {row._i}
          </Link>
        )
      }
    },
    {
      name: trans('label.english'),
      sortable: true,
      selector: (row: Word) => row.english,
      cell: (row: Word) => <>{HTMLReactRender(row.englishHtml)}</>
    },
    {
      name: trans('label.spanish'),
      sortable: true,
      selector: (row: Word) => row.spanish,
      cell: (row: Word) => <>{HTMLReactRender(row.spanishHtml)}</>
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
                <DropdownItem onClick={() => navigate(`/admin/words/${row.id}`)}>{trans('label.edit')}</DropdownItem>
                <DropdownItem onClick={() => removeWord(row.id)}>{trans('label.remove')}</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        )
      }
    }
  ]

  return (
    <Card className="rounded-0 mb-3 react-dataTable react-dataTable-body-transparent">
      <DataTable
        pagination
        data={words}
        columns={tableColumns}
        className="react-dataTable"
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        customStyles={customStyles}
        defaultSortAsc={false}
        defaultSortFieldId="id"
      />
    </Card>
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
