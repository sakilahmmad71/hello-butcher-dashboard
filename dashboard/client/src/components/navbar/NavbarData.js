import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md'
import * as GrIcons from 'react-icons/gr'

const NavbarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'Users',
        path: '/users',
        icon: <FaIcons.FaUsers />,
        cName: 'nav-text',
    },
    {
        title: 'Users Addresses',
        path: '/address',
        icon: <FaIcons.FaAddressBook />,
        cName: 'nav-text',
    },
    {
        title: 'Devices',
        path: '/device',
        icon: <MdIcons.MdDevices />,
        cName: 'nav-text',
    },
    {
        title: 'Products',
        path: '/products',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text',
    },
    {
        title: 'Notifications',
        path: '/notifications',
        icon: <MdIcons.MdNotificationsNone />,
        cName: 'nav-text',
    },
    {
        title: 'Post Codes',
        path: '/postcode',
        icon: <AiIcons.AiOutlineDeliveredProcedure />,
        cName: 'nav-text',
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <FaIcons.FaShoppingCart />,
        cName: 'nav-text',
    },
];

export default NavbarData;
