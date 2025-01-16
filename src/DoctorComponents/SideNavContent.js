import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import "../DoctorCSS/SideNavContent.css";

const SideNavContent = ({ sideNavStatus, list, navigateUrl }) => {
  const navigate = useNavigate();

  return (
    <div className={`side-nav-content ${sideNavStatus ? 'nav-list-open' : ''}`}>
      <ul className={`nav-list`}>
        {list.map((item, index) => (
          <li className="nav-list-item" key={index}>
            <i className={`${item.icon} p-3`}></i>
            <span>
              <a onClick={() => navigate(item.url)}>{item.name}</a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavContent;
