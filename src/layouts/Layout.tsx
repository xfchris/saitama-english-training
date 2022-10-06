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

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <TopNavBar />
      <div className="h-100vh d-flex align-items-end">
        <div className="h-92 w-100 d-flex">{children}</div>
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
        {trans('S-E-TRAINING')}
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {trans('Menú principal')}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <PlayIcon /> {trans('Estudio automático')}
              </DropdownItem>
              <DropdownItem>
                <TogglesIcon /> {trans('Intercambiar idioma')}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <CalendarXIcon /> {trans('Eliminar progreso del día')}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem>
            <Link className="nav-link" to="/admin">
              {trans('Administración')}
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}
