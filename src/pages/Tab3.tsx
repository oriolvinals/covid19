import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { country } from "../services/api";
import "./Tab3.css";

interface ParamType {
	id: string;
}
const Tab3 = () => {
	const { id } = useParams<ParamType>();
	const [countryData, setCountryData] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await country(id);
				setCountryData(data.reverse());
			} catch (error) {
				setError(error);
			}
		};
		getData();
	}, [id]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Country</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Country</IonTitle>
					</IonToolbar>
				</IonHeader>
				{countryData && (
					<div className="grid grid-cols-1 gap-y-4 p-4">
						{countryData.map((c: any) => {
							return (
								<div
									key={c.Date}
									className="rounded-md bg-gray-700 p-4"
								>
									<p className="text-2xl text-center">
										{new Date(c.Date).toLocaleDateString()}
									</p>
									<p>Confirmed: {c.Confirmed}</p>
									<p>Deaths: {c.Deaths}</p>
									<p>Recovered: {c.Recovered}</p>
									<p>Active: {c.Active}</p>
								</div>
							);
						})}
					</div>
				)}
				{error && <div>Error</div>}
			</IonContent>
		</IonPage>
	);
};

export default Tab3;
