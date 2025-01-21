import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import "../DoctorCSS/SideNavContent.css";
import UserStorageService from '../services/UserStorageService';

const SideNavContent = ({ sideNavStatus, list }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();

  const handleRoutes = (item) => {

    if(item.url=="/"){
      UserStorageService.signOut();
    }
    navigate(item.url);
  }

  return (
    <div className={`side-nav-content ${sideNavStatus ? 'nav-list-open' : ''}`}>
      <ul className="nav-list">
        {list.map((item) => (
          <li 
            key={item.number} 
            className="nav-list-item sidebar-item"
            onClick={() => handleRoutes(item)}
          >
            <a title={item.name} className="sidebar-link">
              <i className={`${item.icon} p-3`}></i>
              <span className="sidebar-text">{item.name}</span>
              {item.children && <i className={`fas fa-chevron-${expandedItem === item.number ? 'up' : 'down'} p-3`}></i>}
            </div>
            {item.children && expandedItem === item.number && (
              <ul className="sub-nav-list">
                {item.children.map((subItem) => (
                  <li 
                    key={subItem.number} 
                    className="sub-nav-list-item"
                    onClick={() => navigate(subItem.url)}
                  >
                    <span className="sub-nav-text">{subItem.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavContent;
