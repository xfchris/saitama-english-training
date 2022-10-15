import { ChildrenProps } from '../types/config'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Fade } from 'reactstrap'
import { useState } from 'react'
import logoImg from '../assets/img/saitama-logo.webp'
import { Link } from 'react-router-dom'
import { changeToogleLanguage, trans } from '../config/i18n'
import { TogglesIcon, ChatHeartIcon } from '../components/Icons'
import classNames from 'classnames'
import { useApp } from '../providers/AppProvider'
import { showMsgConfirm } from '../utils/helpers'
import { AUTHOR_URL } from '../config/constants'

type LayoutProps = ChildrenProps & {
  with100?: boolean
}

export default function Layout({ children, with100 = true }: LayoutProps) {
  return (
    <>
      <TopNavBar />
      <div
        className={classNames('align-items-end d-block', {
          'h-100vh d-flex': with100,
          'mt-60px': !with100
        })}
      >
        <Fade
          className={classNames({
            'h-92 w-100 d-flex': with100
          })}
        >
          {children}
        </Fade>
      </div>
    </>
  )
}

function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const { signOut, user } = useApp()

  const handleAboutProject = () => {
    showMsgConfirm('label.aboutDetails', { icon: undefined }).then(r => {
      if (r.isConfirmed) {
        window.open(AUTHOR_URL, '_blank')?.focus()
      }
    })
  }

  return (
    <Navbar color="info" light={true} expand="sm" fixed="top">
      <Link to="/" className="d-flex align-items-center navbar-brand">
        <img
          className="me-1"
          alt="logo"
          src={logoImg}
          style={{
            height: 30
          }}
        />
        {trans('label.logoTextBar')}
      </Link>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {trans('label.mainMenu')}
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem onClick={() => changeToogleLanguage()}>
                <TogglesIcon /> {trans('label.languageToggle')}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleAboutProject}>
                <ChatHeartIcon /> {trans('label.aboutProject')}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem>
            <Link className="nav-link" to="/admin/words">
              {trans('label.admin')}
            </Link>
          </NavItem>
          {user && (
            <NavItem>
              <Link className="nav-link" to="#" onClick={signOut}>
                {trans('button.logout')}
              </Link>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  )
}
