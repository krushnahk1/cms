import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import "../DoctorCSS/SideNavContent.css";
import UserStorageService from '../services/UserStorageService';

const SideNavContent = ({ sideNavStatus, list, toggleSubmenu }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();

  const handleRoutes = (item) => {

    if (item.url == "/") {
      UserStorageService.signOut();
    }
    if (item.isSubitem) {
      console.log(item.subitem);
      // return (
      //   <>
      //     <ul className='sidebar-subitem-list'>
      //       <a title={item.subitem.name} className="sidebar-subitem-link">
      //         <i className={${item.subitem.icon} p-3}></i>
      //         <span className="sidebar-text">{item.subitem.name}</span>
      //       </a>
      //     </ul>
      //   </>
      // );
      toggleSubmenu(item.number);
      console.log(item.isExpanded);

      return;
    }
    navigate(item.url);
  }

  return (
    <div className={`side-nav-content ${sideNavStatus ? 'nav-list-open' : ''}`}>
      <ul className="nav-list">
        {list.map((item) => (
          <li key={item.number} className="nav-list-item sidebar-item" onClick={() => handleRoutes(item)} >
            <a title={item.name} className="sidebar-link">
              <i className={`${item.icon} p-3`}></i>
              <span className="sidebar-text">{item.name}</span>
            </a>
            {item.isSubitem && (
              <ul className='subitem-container' style={{height: item.isExpanded?'100%':'0px', overflow:'hidden'}}>
                {item.subitem.map((subitem) => (
                  <li key={subitem.name} className="nav-list-subitem sidebar-subitem" onClick={() => handleRoutes(subitem)} >
                    <a title={subitem.name} className="sidebar-link-subitem">
                      <i className={`${subitem.icon} p-3`}></i>
                      <span className="sidebar-text-subitem">{subitem.name}</span>
                    </a>
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

{/* <a title={item.name} className="sidebar-link">
              <i className={${item.icon} p-3}></i>
              <span className="sidebar-text">{item.name}</span>
              
              {item.children && <i className={fas fa-chevron-${expandedItem === item.number ? 'up' : 'down'} p-3}></i>}
            </a>
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
            )} */}