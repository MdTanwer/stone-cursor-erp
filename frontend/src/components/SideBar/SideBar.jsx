import { NavLink } from 'react-router-dom';
import {
  FaBars,
  FaCartPlus,
  FaFile,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaSalesforce,
  FaUser,
  FaUserCheck,
  FaUserPlus,
} from 'react-icons/fa';
import PeopleIcon from '@material-ui/icons/People';
import { MdInventory, MdMessage, MdMovieCreation } from 'react-icons/md';
// import { BiAnalyse, BiSearch } from "react-icons/bi";
// import { BiCog } from "react-icons/bi";
// import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
// import { BsCartCheck } from "react-icons/bs";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import {
  AiFillSetting,
  AiOutlineTransaction,
  AiTwotoneFileExclamation,
} from 'react-icons/ai';
import {
  BiAnalyse,
  BiSearch,
  BiSolidBank,
  BiSolidPurchaseTag,
  BiSolidTruck,
} from 'react-icons/bi';
import { SiTransportforlondon } from 'react-icons/si';
import { useSelector } from 'react-redux';
import { RiAdminFill } from 'react-icons/ri';
import { TbReportSearch } from 'react-icons/tb';
import {
  BsFillBuildingsFill,
  BsFillFuelPumpFill,
  BsTruck,
} from 'react-icons/bs';
import { GiFuelTank, GiStonePile, GiWeight } from 'react-icons/gi';

import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import { GroupAddOutlined, HomeOutlined, MoneyOff, Receipt } from '@material-ui/icons';

//  for normal user

const routes = [
  {
    path: '/inventory',
    name: 'Inventory',
    icon: <MdInventory size={22} />,
    subRoutes: [
      {
        path: '/inventory/crusher-purchase-entry',
        name: 'Purchase Entry',
        icon: <BiSolidPurchaseTag />,
      },

      {
        path: '/inventory/crusher-sales-entry',
        name: 'Sales Entry',
        icon: <FaSalesforce />,
      },
      {
        path: '/inventory/material-tracking',
        name: 'Material Tracking',
        icon: <FaSalesforce />,
      },
    ],
  },

  {
    path: '/expense',
    name: 'Expense Management',
    icon: <AiOutlineTransaction size={22} />,
    subRoutes: [
      {
        path: '/expense/daily-expense',
        name: 'Daily Expenses',
        icon: <FaMoneyBill />,
      },
      {
        path: '/expense/maintanance',
        name: 'Maintanance',
        icon: <FaMoneyBill />,
      },
      {
        path: '/expense/fuel-expenses',
        name: 'Fuel Expenses',
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: <TbReportSearch size={22} />,
    subRoutes: [
      {
        path: '/reports/customer-list',
        name: 'Customer List',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/purchase-register',
        name: 'Purchase Register',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/Party-wise-purchase-register',
        name: 'Party wise purchase register',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/sales-register',
        name: 'Sales register',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/profit-statement',
        name: 'Profit Statement',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/accounts-ledger',
        name: 'Accounts Ledger',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/day-book',
        name: 'Day Book',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/account-balance',
        name: 'Account Balance',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/company-setup',
        name: 'Group Balance',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/trial-balance',
        name: 'Trial Balance',
        icon: <BiAnalyse />,
      },
      {
        path: '/reports/Profit-loss',
        name: 'Profit & Loss',
        icon: <BiAnalyse />,
      },
    ],
  },
];
//  for Admin user

const routesadmin = [
  {
    path: '/master',
    name: 'Master',
    icon: <RiAdminFill size={22} />,
    subRoutes: [
      {
        path: '/master/company-setup',
        name: 'Company Setup',
        icon: <BsFillBuildingsFill />,
      },
      {
        path: '/master/party',
        name: 'Customer/Party',
        icon: <FaUserPlus />,
      },
      {
        path: '/master/supplier',
        name: 'Supplier',
        icon: <MdMovieCreation />,
      },

      {
        path: '/master/destination',
        name: 'Destination',
        icon: <MdMovieCreation />,
      },
      {
        path: '/master/salesman',
        name: 'Salesman',
        icon: <MdMovieCreation />,
      },
      {
        path: '/master/employee',
        name: 'Employee',
        icon: <MdMovieCreation />,
      },
      {
        path: '/master/material',
        name: 'Material',
        icon: <MdMovieCreation />,
      },
      {
        path: '/master/vendor',
        name: 'Vendor',
        icon: <MdMovieCreation />,
      },

      // {
      //   path: "/master/vehicle-owner",
      //   name: "Vehicle Owner",
      //   icon: <FaMoneyBill />,
      // },

      {
        path: '/master/gitti-size',
        name: 'Gitti Size',
        icon: <GiStonePile />,
      },
      {
        path: '/master/unit',
        name: 'Unit',
        icon: <GiWeight />,
      },
      {
        path: '/master/bank',
        name: 'Bank',
        icon: <BiSolidBank />,
      },

      {
        path: '/master/group-heads',
        name: 'Group Heads',
        icon: <GroupsIcon fontSize='14px' />,
      },
      {
        path: '/master/fuel-pump',
        name: 'Fuel Pump',
        icon: <GroupsIcon fontSize='14px' />,
      },
      // {
      //   path: "/master/vehicle",
      //   name: "Vehicle",
      //   icon: <BiSolidTruck />,
      // },
      {
        path: '/master/transport',
        name: 'Transport',
        icon: <MdMovieCreation />,
      },
      {
        path: '/master/load-type',
        name: 'LoadType',
        icon: <BiSolidTruck />,
      },

      {
        path: '/master/driver',
        name: 'Driver Master',
        icon: <BiSolidTruck />,
      },
    ],
  },
];
//  for Super Admin user
const routesadminmaster = [
  {
    path: '/',
    name: 'Dashboard',
    icon: <HomeOutlined size={20} />,
  },
  {
    path: '/master',
    name: 'Master',
    icon: <RiAdminFill size={22} />,
    subRoutes: [
      // {
      //   path: "/master/company-setup",
      //   name: "Company Setup",
      //   icon: <BsFillBuildingsFill />,
      // },
      // {
      //   path: "/master/chalan-entry",
      //   name: "Challan Entry",
      //   icon: <BsFillBuildingsFill />,
      // },
      {
        path: '/master/customer-party',
        name: 'Customer/Party',
        icon: <FaUserPlus />,
      },
      {
        path: '/master/supplier',
        name: 'Supplier',
        icon: <MdMovieCreation />,
      },
      // {
      //   path: "/master/salesman",
      //   name: "Salesman",
      //   icon: <MdMovieCreation />,
      // },
      // {
      //   path: "/master/employee",
      //   name: "Employee",
      //   icon: <MdMovieCreation />,
      // },
      {
        path: '/master/material',
        name: 'Material',
        icon: <MdMovieCreation />,
      },
      {
        path: '/master/vendor',
        name: 'Vendor',
        icon: <MdMovieCreation />,
      },
      {
        path: '/master/source',
        name: 'Source / Mine',
        icon: <MdMovieCreation />,
      },
      {
        path: '/master/materialrate',
        name: 'Material Rate',
        icon: <MdMovieCreation />,
      },

      // {
      //   path: "/master/vehicle-owner",
      //   name: "Vehicle Owner",
      //   icon: <FaMoneyBill />,
      // },

      // {
      //   path: "/master/gitti-size",
      //   name: "Gitti Size",
      //   icon: <GiStonePile />,
      // },
      {
        path: '/master/unit',
        name: 'Unit',
        icon: <GiWeight />,
      },
      // {
      //   path: "/master/bank",
      //   name: "Bank",
      //   icon: <BiSolidBank />,
      // },

      // {
      //   path: "/master/group-heads",
      //   name: "Group Heads",
      //   icon: <GroupsIcon fontSize="14px" />,
      // },
      {
        path: '/master/fuel-pump',
        name: 'Fuel Pump',
        icon: <BsFillFuelPumpFill />,
      },
      // {
      //   path: "/master/vehicle",
      //   name: "Vehicle",
      //   icon: <BiSolidTruck />,
      // },
      {
        path: '/master/loader-master',
        name: 'Loader Master',
        icon: <BiSolidTruck />,
      },
      // {
      //   path: "/master/transport",
      //   name: "Transport",
      //   icon: <SiTransportforlondon />,
      // },
      {
        path: '/master/loaded-type',
        name: 'Load Type',
        icon: <SiTransportforlondon />,
      },
      {
        path: "/master/royalty",
        name: "Mining Royalty",
        icon: <MdMovieCreation />,
      },

      {
        path: '/master/destination',
        name: 'Destination',
        icon: <MdMovieCreation />,
      },
      // {
      //   path: '/master/load-type',
      //   name: 'LoadType',
      //   icon: <BiSolidTruck />,
      // },
      // {
      //   path: "/master/driver-master",
      //   name: "Driver Master",
      //   icon: <BiSolidTruck />,
      // },
      // {
      //   path: '/master/fuel-expenses',
      //   name: 'Fuel Expenses',
      //   icon: <GiFuelTank />,
      // },
    ],
  },
  {
    path: '/transaction',
    name: 'Transactions',
    icon: <AiOutlineTransaction size={22} />,
    subRoutes: [
      // {
      //   path: "/transaction/voucher-entry",
      //   name: "Challan Entry",
      //   icon: <FaMoneyBill />,
      // },
      {
        path: '/transaction/chalan-entry',
        name: 'Challan Entry',
        icon: <BsFillBuildingsFill />,
      },
      {
        path: '/transaction/invoice',
        name: 'Invoice',
        icon: <FaFileInvoiceDollar />,
      },

      {
        path: 'transaction/payment-recieved-amount',
        name: 'Recieved Amount',
        icon: <BiSolidBank />,
      },
      {
        path: 'transaction/payment-amount',
        name: 'Payment Amount',
        icon: <BiSolidBank />,
      },

      {
        path: '/transaction/quotation-entry',
        name: 'Quotation Entry',
        icon: <BiAnalyse />,
      },
    ],
  },
  {
    path: '/staff',
    name: 'Staff Management',
    icon: <GroupAddOutlined size={22} />,
    subRoutes: [
      {
        path: '/staff/employee',
        name: 'Employee',
        icon: <MdMovieCreation />,
      },
      {
        path: '/staff/chalan-entry',
        name: 'Attandence',
        icon: <BsFillBuildingsFill />,
      },
      {
        path: '/staff/chalan-entry',
        name: 'Salary Process',
        icon: <BsFillBuildingsFill />,
      },
    ],
  },
  {
    path: '/vehicle',
    name: 'Vehicle / Transport',
    icon: <BsTruck size={22} />,
    subRoutes: [
      // {
      //   path: "/staff/company-setup",
      //   name: "Vehicle",
      //   icon: <BsFillBuildingsFill />,
      // },
      {
        path: '/vehicle/vehicle-master',
        name: 'Vehicle Master',
        icon: <BiSolidTruck />,
      },
      {
        path: '/vehicle/driver-master',
        name: 'Driver Master',
        icon: <BsTruck />,
      },
      {
        path: '/vehicle/transport-master',
        name: 'Transport Master',
        icon: <BsFillBuildingsFill />,
      },
    ],
  },
];
//  for Super Admin user
const routessuperadmin = [

  {
    path: '/app-setting',
    name: 'App Settings',
    icon: <AiFillSetting size={22} />,
    subRoutes: [
      {
        path: '/app-setting/company-setup',
        name: 'Multi company creation',
        icon: <BiAnalyse />,
      },
      {
        path: '/app-setting/company-setup',
        name: 'Manager User',
        icon: <BiAnalyse />,
      },
      {
        path: '/app-setting/company-setup',
        name: 'Change Password',
        icon: <BiAnalyse />,
      },
      {
        path: '/app-setting/company-setup',
        name: 'Database Backup',
        icon: <BiAnalyse />,
      },
      {
        path: '/app-setting/company-setup',
        name: 'Database Restore',
        icon: <BiAnalyse />,
      },
      {
        path: '/app-setting/company-setup',
        name: 'Flexible Closing(Accounts)',
        icon: <BiAnalyse />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useSelector((state) => state.user);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: '170px',
      padding: '5px 15px',
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className='main-container'>
        <motion.div
          animate={{
            width: isOpen ? '240px' : '55px',
            transition: { duration: 0.5, type: 'spring', damping: 10 },
          }}
          className={`sidebar `}
        >
          <div className='top_section'>
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                  className='logo'
                >
                  Stone Crusher ERP
                </motion.h1>
              )}
            </AnimatePresence>

            <div className='bars'>
              <FaBars size={22} onClick={toggle} />
            </div>
          </div>
          <div className='search'>
            <div className='search_icon'>
              <BiSearch size={22} />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                  variants={inputAnimation}
                  type='text'
                  placeholder='Search'
                />
              )}
            </AnimatePresence>
          </div>
          {/* <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section> */}

          {user && user?.role === 'Admin' && (
            <section className='routes'>
              {routesadmin.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className='link'
                    activeClassName='active'
                  >
                    <div className='icon'>{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial='hidden'
                          animate='show'
                          exit='hidden'
                          className='link_text'
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          )}

          {user && user?.role === 'SuperAdmin' && (
            <section className='routes'>
              {routesadminmaster.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className='link'
                    activeClassName='active'
                  >
                    <div className='icon'>{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial='hidden'
                          animate='show'
                          exit='hidden'
                          className='link_text'
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          )}

          <section className='routes'>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className='link'
                  activeClassName='active'
                >
                  <div className='icon'>{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial='hidden'
                        animate='show'
                        exit='hidden'
                        className='link_text'
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>

          {user && user?.role === 'SuperAdmin' && (
            <section className='routes'>
              {routessuperadmin.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className='link'
                    activeClassName='active'
                  >
                    <div className='icon'>{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial='hidden'
                          animate='show'
                          exit='hidden'
                          className='link_text'
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          )}
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
