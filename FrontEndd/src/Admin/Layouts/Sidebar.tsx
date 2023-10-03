// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useDispatch, useSelector } from 'react-redux';

// @ts-ignore
import { RootState } from './../../Redux/Reducers'; // Import your RootState type

// @ts-ignore
import { getPermissions, listPermissions } from './../../Redux/AuthSlice';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPermissions());
    dispatch(listPermissions());
  }, []);

  const adminsPerm = useSelector((state: RootState) => state.auth.permissions);
  const permissions = useSelector((state: RootState) => state.auth.listPerm);
  console.log('adminsPerm',adminsPerm)
  console.log('permissions',permissions)
 

  const hasPermission = () => {
    if (!permissions || !adminsPerm?.permissions) {
      // Handle the case where permissions or adminsPerm.permissions is undefined
      return []; // Or you can return an appropriate default value
    }
  
    // Extract permission objects into arrays
    const userPermissions = permissions;
    const adminPermissions = adminsPerm.permissions;
  
    // Find common permissions
    const commonPermissions = userPermissions.filter((userPermission) =>
      adminPermissions.some(
        (adminPermission) => adminPermission.name === userPermission.name
      )
    );
  
    return commonPermissions;
  };
  
  // Example usage:
  const commonPermissions = hasPermission();
  // console.log(commonPermissions[0].name)
  if (commonPermissions.length > 0) {
    // Display or use the common permissions
    const commonPermissionNames = commonPermissions.map(
      (permission) => permission.name
    );
    console.log("Common Permission Names:", commonPermissionNames);
  } else {
    console.log("No Common Permissions found.");
  }
  
  

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen, trigger]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`sideBar absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex justify-between gap-2 pl-13 py-5.5 lg:py-6.5">
        <NavLink to="/" >
          <img src={logo} alt="Logo" className='w-[7em]'/>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden pr-2"
        >
          <svg
            className="fill-current text-byelow"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
              <i className="fa-solid fa-ellipsis-vertical text-byelow"></i> 
              <i className="fa-solid fa-ellipsis-vertical text-byelow"></i>
              <i className="fa-solid fa-ellipsis-vertical text-byelow"></i> MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">

            <li>
              <NavLink
                  to=""
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                    (pathname === '/admin' || pathname === '/admin/') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                  }`}
                >
                  <i className="fa-solid fa-chart-line  hover:text-bgray"></i>
                  Dashboard
              </NavLink>
              </li>
              {(commonPermissions.length > 0 && commonPermissions[9]?.name == 'Permissions') && (
             
              <SidebarLinkGroup
                    activeCondition={
                      pathname.includes('utilisateur') || pathname.includes('affecter_permissions')
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              ( pathname.includes('driver_demandes') || pathname.includes('listDriver') ) &&
                              'bg-graydark dark:bg-meta-4'
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <i className="fa-solid fa-users-rays hover:text-bgray"></i>
                          Utilisateurs
                            <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                open && 'rotate-180'
                              }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill=""
                              />
                            </svg>
                          </NavLink>
                          {/* <!-- Dropdown Menu Start --> */}
                          <div
                            className={`translate transform overflow-hidden ${
                              !open && 'hidden'
                            }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              <li>
                              <NavLink
                                  to="affecter_permissions"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                    (pathname.includes('affecter_permissions')) ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                                  }`}
                                >
                                Affecter des permissions
                              </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="utilisateur"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                    pathname.includes('utilisateur') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                                  }`}
                                >
                                  Admins
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="clients"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                    pathname.includes('clients') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                                  }`}
                                >
                                  Clients
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                </SidebarLinkGroup>
                 )}
              {/* <!-- Menu Item Dashboard --> */}
              {(commonPermissions.length > 0 && commonPermissions[0]?.name == 'Reservations') && (
              <SidebarLinkGroup
                activeCondition={
                  pathname.includes('immediate') || pathname.includes('plus_tard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          ( pathname.includes('plus_tard') || pathname.includes('immediate') || pathname.includes('archive')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                      <i className='fa-regular fa-bookmark hover:text-bgray  '></i>
                        Les reservations
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                          <NavLink
                              to="immediate"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                (pathname.includes('immediate')) ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                              Immédiate
                          </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="plus_tard"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                pathname.includes('plus_tard') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                              Plus tard
                            </NavLink>
                          </li>
                          <li>
                          <NavLink
                              to="transferResev"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                (pathname.includes('transferResev')) ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                              Transfers
                          </NavLink>
                          </li>
                          <li>
                          <NavLink
                              to="archive"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                pathname.includes('archive') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                              Archivé
                          </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              )}
              {(commonPermissions.length > 0 && commonPermissions[0]?.name == 'Reservations') && (
              <SidebarLinkGroup
                activeCondition={
                  pathname.includes('driver_demandes') || pathname.includes('listDriver')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          ( pathname.includes('driver_demandes') || pathname.includes('listDriver') ) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                      <i className="fa-solid fa-car-rear hover:text-bgray"></i>
                        Les chauffeurs
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                          <NavLink
                              to="driver_demandes"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                (pathname.includes('driver_demandes')) ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                             Les demandes
                          </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="listDriver"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                pathname.includes('listDriver') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                               Nos chauffeurs
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="drivers_refuse"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                pathname.includes('drivers_refuse') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                              Chauffeurs Refuser
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              )}
              {/* <!-- Menu Item Dashboard --> */}
               {/* <!-- Menu Item demande --> */}
            {(commonPermissions.length > 0 && commonPermissions[6]?.name == 'Services') && (
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/services' || pathname.includes('services')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/services' || pathname === '/voyage_long_duree' ||  pathname.includes('voyage_long_duree') ||
                            pathname.includes('services')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                    <i className={`fa-solid fa-microchip hover:text-bgray`}></i>
                        Les services
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                          <NavLink
                              to="services"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                pathname.includes('services') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-bodydark1'
                              }`}
                            >
                              Solution transport
                          </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="voyage_long_duree"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                pathname.includes('voyage_long_duree') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                              Trajet international
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            )}
              {/* <!-- Menu Item demande --> */}

                {/* <!-- Menu Group --> */}
              {/* <!-- Menu Item demande --> */}
              {(commonPermissions.length > 0 && commonPermissions[8]?.name == 'Demandes') && (
              <SidebarLinkGroup
                activeCondition={
                  pathname.includes('demande_service') || pathname.includes('demande_voyage_long')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname.includes('demande_service') || pathname.includes('demande_voyage_long')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                            fill=""
                          />
                        </svg>
                        Les demandes
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                                to="demande_service"
                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 pr-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                  pathname.includes('demande_service') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                                }`}
                              >
                                <i className={`fa-solid fa-demande_service ${pathname.includes('demande_service') ? 'text-bgray' : 'text-byelow'}`}></i>
                                Solution transport
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="demande_voyage_long"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                                pathname.includes('demande_voyage_long') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-white'
                              }`}
                            >
                              Trajet international
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              )}
              {/* <!-- Menu Item demande --> */}
              {(commonPermissions.length > 0 &&  commonPermissions[7]?.name == 'Vehicules') && (
              <li>
                <NavLink
                  to="vehicule"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                    pathname.includes('vehicule') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-bodydark1'
                  }`}
                >
                  <i className={`fa-solid fa-map-location-dot hover:text-bgray ${pathname.includes('vehicule') ? 'text-bgray' : 'text-bodydark1'}`}></i>
                  Vehicules
                </NavLink>
              </li>
              )}

              

              {/* <!-- Menu msgs --> */}
              {/* <li>
                <NavLink
                  to="messages"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                    pathname.includes('messages') ? 'bg-byelow text-white dark:bg-meta-4' : 'text-white'
                  }`}
                >
                  <i className={`fa-regular fa-message ${pathname.includes('messages') ? 'text-white' : 'text-byelow'}`}></i>
                  Messages
                </NavLink>
              </li> */}
              {(commonPermissions.length > 0 && commonPermissions[4]?.name == 'Transfers') && (
              <li>
                <NavLink
                  to="transfers"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                    pathname.includes('transfers') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-bodydark1'
                  }`}
                >
                  <i className={`fa-solid fa-map-location-dot hover:text-bgray ${pathname.includes('transfers') ? 'text-bgray' : 'text-bodydark1'}`}></i>
                  Transfers
                </NavLink>
              </li>
              )}
               {/* <!-- Menu blog --> */}
               {(commonPermissions.length > 0 && commonPermissions[3]?.name == 'Blog') && (
               <li>
                <NavLink
                  to="blog"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                    pathname.includes('blog') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-bodydark1'
                  }`}
                >
                  <i className={`fa-solid fa-blog hover:text-bgray ${pathname.includes('blog') ? 'text-bgray' : 'text-bodydark1'}`}></i>
                  Blog
                </NavLink>
              </li>
               )}
               {(commonPermissions.length > 0 && commonPermissions[1]?.name == 'Messsages') && (
              <li>
                <NavLink
                  to="chat"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                    pathname.includes('chat') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-bodydark1'
                  }`}
                >
                  <i className={`fa-brands fa-rocketchat hover:text-bgray ${pathname.includes('chat') ? 'text-bgray' : 'text-bodydark1'}`}></i>
                  Messages
                </NavLink>
              </li>
               )}
               {(commonPermissions.length > 0 && commonPermissions[2]?.name == 'Client') && (
              <li>
                <NavLink
                  to="visiteurs"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-bgray hover:bg-byelow dark:hover:bg-meta-4 ${
                    pathname.includes('visiteurs') ? 'bg-byelow text-bgray dark:bg-meta-4' : 'text-bodydark1'
                  }`}
                >
                  <i className={`fa-solid fa-users-line hover:text-bgray ${pathname.includes('clients') ? 'text-bgray' : 'text-bodydark1'}`}></i>
                  Visiteurs
                </NavLink>
              </li>
               )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
