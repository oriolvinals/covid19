import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, globeOutline } from "ionicons/icons";
import Countries from "./pages/Countries";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Country from "./pages/Country";

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route exact path="/country/:id">
					<Country />
				</Route>
			</IonRouterOutlet>
			<IonTabs>
				<IonRouterOutlet>
					<Route exact path="/home">
						<Home />
					</Route>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
					<Route path="/countries">
						<Countries />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="home" href="/home">
						<IonIcon icon={globeOutline} />
						<IonLabel>Global</IonLabel>
					</IonTabButton>
					<IonTabButton tab="countries" href="/countries">
						<IonIcon icon={ellipse} />
						<IonLabel>Countries</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
