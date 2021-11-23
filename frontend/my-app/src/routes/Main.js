import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import FormPage from './FormPage';
import Setting from './Setting';
import ProfilePage from './ProfilePage';
import Menubar from '../components/Menubar';

function Main(){
	return (
		<Router>
			<Menubar />
			<Switch>
				<Route path="/main/profile"><ProfilePage /></Route>
				<Route path="/main/chat"></Route>
				<Route path="/main"><FormPage /></Route>
			</Switch>
		</Router>
	);
}

export default Main;