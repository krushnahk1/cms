import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import "../DoctorCSS/SideNavContent.css";

const SideNavContent = ({ sideNavStatus, list }) => {
  const navigate = useNavigate();

  return (
    <div className={`side-nav-content ${sideNavStatus ? 'nav-list-open' : ''}`}>
      <ul className="nav-list">
        {list.map((item) => (
          <li 
            key={item.number} 
            className="nav-list-item sidebar-item"
            onClick={() => navigate(item.url)}
          >
            <a title={item.name} className="sidebar-link">
              <i className={`${item.icon} p-3`}></i>
              <span className="sidebar-text">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavContent;
