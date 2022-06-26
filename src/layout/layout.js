import React, {useState} from 'react';
import { useIntl } from 'react-intl';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from 'react-pro-sidebar';
import { FaTachometerAlt, FaPiggyBank, FaUserCircle, FaGithub, FaRegCalendarMinus, FaTools, FaCogs, FaReceipt} from 'react-icons/fa';
import sidebarBg from '../assets/bg2.jpg';
import Dashboard from '../main/main';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";


import Receipts from '../receipt/list_receipts';
import Users from '../users/list_users';
import Customer from '../users/user';
import SavingsAccounts from '../savings/list_savings';
import Savings from '../savings/savings';
import Receipt from '../receipt/receipt';

const Sidebar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
    const intl = useIntl();
    const [locale, setLocale] = useState('en');
    return (
      <Router>
          <ProSidebar
          image={image ? sidebarBg : false}
          rtl={rtl}
          collapsed={collapsed}
          toggled={toggled}
          breakPoint="md"
          onToggle={handleToggleSidebar}
        >
          <SidebarHeader>
            <div
              style={{
                padding: '24px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 14,
                letterSpacing: '1px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {intl.formatMessage({ id: 'sidebarTitle' })}
            </div>
          </SidebarHeader>
    
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem
                icon={<FaTachometerAlt />}>
                {intl.formatMessage({ id: 'dashboard' })}
                <Link to='dashboard'/>
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu
                title={intl.formatMessage({ id: 'management' })}
                icon={<FaRegCalendarMinus />}
              >
                <MenuItem icon={<FaUserCircle/>}>
                  {intl.formatMessage({ id: 'customers' })}
                  <Link to='users'/>
                </MenuItem>
                <MenuItem icon={<FaPiggyBank/>}>
                  {intl.formatMessage({ id: 'savings' })}
                  <Link to='savings'/>
                </MenuItem>
              </SubMenu>
              <SubMenu
                title={intl.formatMessage({ id: 'tools' })}
                icon={<FaTools />}
              >
                <MenuItem icon={<FaReceipt/>}>
                    {intl.formatMessage({ id: 'receipts' })}
                    <Link to='receipts'/>
                </MenuItem>
                <MenuItem icon={<FaCogs/>}>{intl.formatMessage({ id: 'settings' })}</MenuItem>
              </SubMenu>
            </Menu>
          </SidebarContent>
    
          <SidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: '20px 24px',
              }}
            >
              <a
                href="https://github.com/azouaoui-med/react-pro-sidebar"
                target="_blank"
                className="sidebar-btn"
                rel="noopener noreferrer"
              >
                <FaGithub />
                <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {intl.formatMessage({ id: 'viewSource' })}
                </span>
              </a>
            </div>
          </SidebarFooter>
        </ProSidebar>

        <Routes>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path='receipts' element={<Receipts/>}/>
          <Route exact path='users' element={<Users/>}/>
          <Route path="users/:id" element={<Customer />}/>
          <Route exact path='savings' element={<SavingsAccounts/>} />
          <Route path="savings/:id" element={<Savings/>} />
          <Route exact path='receipts'/>
          <Route path="receipts/:id" element={<Receipt/>}/>
        </Routes>
      </Router>
      
    );
  };
  
  function Layout({ setLocale, screen }) {
    const [rtl, setRtl] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [image, setImage] = useState(true);
    const [toggled, setToggled] = useState(false);
  
    const handleCollapsedChange = (checked) => {
      setCollapsed(checked);
    };
  
    const handleRtlChange = (checked) => {
      setRtl(checked);
      setLocale(checked ? 'ar' : 'en');
    };
    const handleImageChange = (checked) => {
      setImage(checked);
    };
  
    const handleToggleSidebar = (value) => {
      setToggled(value);
    };
  
    return (
      <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
        <Sidebar
          image={image}
          collapsed={collapsed}
          rtl={rtl}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
    );
  }
  
  export default Layout;