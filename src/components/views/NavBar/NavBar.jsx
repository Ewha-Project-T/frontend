import React, { useState} from 'react';
import './NavBar.css';
import { Link,useNavigate } from 'react-router-dom';
import Ewha from './ewha_logo.png';
import Axios from 'axios';

function NavBar() {

	
	let navigate = useNavigate();
	const [isActive, setActive] = useState("false");



	const onNavtoggleHandler = (event) =>{
		event.preventDefault();
		setActive(!isActive);
		
	}
	
	const onLogoutHandler = () => {
		Axios.get('https://translation-platform.site:8443/api/user/logout')
		.then(response => {
			if(response.data.logoutSuccess){
				navigate("/login");
			}else{
				alert('Error');
			}
		})
	}

	return (
		<div>
			<nav className="navbar">
				<div className="navbar__logo">
					<Link to="/">
						<img
							src={Ewha}
							style={{ height: '55px', marginTop: '5px' }}
							alt="ewha_logo"
						/>
					</Link>
				</div>

				<ul className={"navbar__menu" +(isActive ? "" : " active")} >
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/">과제</Link>
					</li>
					<li>
						<Link to="/">제출확인</Link>
					</li>
					<li>
						<Link to="/">Q&A</Link>
					</li>
					<li>
						<Link to="/">FAQ</Link>
					</li>
				</ul>

				<ul  className={"navbar__icons"+(isActive ? "" : " active")}>
					<li>
						<Link to="#" onClick={onLogoutHandler}>
						<i className="fa-solid fa-arrow-right-from-bracket"></i>
						</Link>
					</li>
				</ul>
				<Link to="#" className="navbar__toogleBtn" onClick={onNavtoggleHandler}>
					<i className="fa-solid fa-bars"></i>
				</Link>
			</nav>
		</div>
	);
}

export default NavBar;