import { Link } from 'react-router-dom';
import styles from './Menubar.module.css'

const menuData = [
  {
      title: 'Home',
      path: '/main',
	  cName:'menu-text'
  },
  {
      title: 'profile',
      path: '/main/profile',
	  cName:'menu-text'
  },
  {
      title: 'chat',
      path: '/main/chat',
	  cName:'menu-text'
  },
 {
     title: 'setting',
     path: '/',
	 cName:'menu-text'
  }
];

function Menubar(){
	return(
		<div className={styles.menubar}>
			<ul className={styles.menu}>
				{menuData.map((item, index)=>(
				<li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
				)
				)}
			</ul>
		</div>
	)
}
export default Menubar;