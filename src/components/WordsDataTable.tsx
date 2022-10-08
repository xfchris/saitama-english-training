import { Link } from 'react-router-dom'
import { trans } from '../config/i18n'
import AlertNoRecords from './AlertNoRecords'
import DataTable, { TableStyles } from 'react-data-table-component'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

const fakeData = [
  {
    id: 1,
    english: 'Pardon me, do you know where Central Park is?',
    spanish: 'Disculpe, ¿sabe dónde está Central Park?',
    createdAt: '2020-07-21 10:44:05'
  }
]
for (let i = 0; i < 100; i++) {
  fakeData.push(fakeData[0])
}

export function WordsDataTable() {
  const { data, isLoading } = { data: fakeData, isLoading: false }

  if (isLoading) {
    return <>Loading...</>
  }

  if (!data || !data.length) {
    return <AlertNoRecords title="label.noRecords" />
  }

  const tableColumns = [
    {
      name: trans('label.id'),
      width: '10%',
      sortable: true,
      selector: (row: any) => row.id,
      cell: (row: any) => {
        const link = `/words/${row.id}`
        return (
          <Link className="text-decoration-none fw-bold text-danger" to={link}>
            {row.id}
          </Link>
        )
      }
    },
    {
      id: 'name',
      name: trans('label.english'),
      sortable: true,
      selector: (row: any) => row.english
    },
    {
      name: trans('label.spanish'),
      sortable: true,
      selector: (row: any) => row.spanish
    },
    {
      sortable: false,
      width: '92px',
      cell: (row: any) => {
        return (
          <>
            <UncontrolledDropdown size="sm">
              <DropdownToggle caret>{trans('label.options')}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>{trans('label.edit')}</DropdownItem>
                <DropdownItem>{trans('label.remove')}</DropdownItem>
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
        data={data}
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
