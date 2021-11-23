import styles from "./Home.module.css";
import {Link } from 'react-router-dom';

function Home(){
	return (
		<div className={styles.container}>
			<div className={styles.login}>
				<div><h1>login</h1></div>
				<div>
					{/*임시로 a태그로 변경*/}
					<a href="https://connectian.ga/v1/auth/google">
    				<img class="login-btn" id="google-pressed-btn" src="/images/btn_google_signin_light_pressed_web@2x.png"
         			alt="google-oauth-login"/>
				</a>
				</div>
				<Link to="/main">
				</Link>
			</div>
		</div>
	);
}

export default Home;