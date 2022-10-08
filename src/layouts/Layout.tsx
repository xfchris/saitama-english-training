import { ChildrenProps } from '../types/config'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { useState } from 'react'
import logoImg from '../assets/img/saitama-logo.webp'
import { Link } from 'react-router-dom'
import { trans } from '../config/i18n'
import { TogglesIcon, PlayIcon, CalendarXIcon } from '../components/Icons'
import classNames from 'classnames'

type Layout = ChildrenProps & {
  with100?: boolean
}

export default function Layout({ children, with100 = true }: Layout) {
  return (
    <>
      <TopNavBar />
      <div
        className={classNames('align-items-end d-block', {
          'h-100vh d-flex': with100,
          'mt-60px': !with100
        })}
      >
        <div
          className={classNames({
            'h-92 w-100 d-flex': with100
          })}
        >
          {children}
        </div>
      </div>
    </>
  )
}

function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar color="info" light={true} expand="sm" fixed="top">
      <NavbarBrand className="d-flex align-items-center" href="/">
        <img
          className="me-1"
          alt="logo"
          src={logoImg}
          style={{
            height: 30
          }}
        />
        {trans('label.logoTextBar')}
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {trans('label.mainMenu')}
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <PlayIcon /> {trans('label.automaticStudy')}
              </DropdownItem>
              <DropdownItem>
                <TogglesIcon /> {trans('label.languageToggle')}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <CalendarXIcon /> {trans('label.removeDailyProgress')}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem>
            <Link className="nav-link" to="/admin/words">
              {trans('label.admin')}
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}