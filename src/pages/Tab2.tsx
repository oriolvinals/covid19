import {
	IonContent,
	IonHeader,
	IonPage,
	IonSearchbar,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import { countries } from "../services/api";
import { useEffect, useState } from "react";

interface Country {
	ID: string;
	Country: string;
	CountryCode: string;
	Slug: string;
	NewConfirmed: number;
	TotalConfirmed: number;
	NewDeaths: number;
	TotalDeaths: number;
	NewRecovered: number;
	TotalRecovered: number;
	Date: Date;
	Premium?: {};
}

interface Name {
	Country: string;
}
const Tab2 = () => {
	const [countriesData, setCountries] = useState([]);
	const [error, setError] = useState();
	const [searchText, setSearchText] = useState("");
	const [countriesFilter, setCountriesFilter] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await countries();
				setCountries(data.Countries);
			} catch (error) {
				setError(error);
			}
		};
		getData();
	}, []);

	useEffect(() => {
		const filteredCountries = countriesData.filter(({ Country }: Name) =>
			Country.toLowerCase().includes(searchText.toLowerCase())
		);
		setCountriesFilter(filteredCountries);
	}, [countriesData, searchText]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Countries</IonTitle>
				</IonToolbar>
				<div className="bg-black">
					<IonSearchbar
						value={searchText}
						onIonChange={(e) => setSearchText(e.detail.value!)}
					></IonSearchbar>
				</div>
			</IonHeader>
			<IonContent>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Countries</IonTitle>
					</IonToolbar>
				</IonHeader>
				{countriesData && (
					<div className="grid grid-cols-1 gap-y-4 p-4">
						{countriesFilter.map((c: Country) => {
							return (
								<a
									key={c.ID}
									className="rounded-md bg-gray-700 p-4"
									href={"/tabs3/" + c.Country}
								>
									<p>{c.Country}</p>
									<p>
										Date:{" "}
										{new Date(c.Date).toLocaleDateString()}
									</p>
									<p>New confirmed: {c.NewConfirmed}</p>
									<p>Total confirmed: {c.TotalConfirmed}</p>
									<p>New deaths: {c.NewDeaths}</p>
									<p>Total deaths: {c.TotalDeaths}</p>
									<p>New recovered: {c.NewRecovered}</p>
									<p>Total recovered: {c.TotalRecovered}</p>
								</a>
							);
						})}
					</div>
				)}
			</IonContent>
		</IonPage>
	);
};

export default Tab2;
