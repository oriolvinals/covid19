import {
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonSearchbar,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { countries } from "../services/api";
import { useEffect, useState } from "react";
import Error from "../components/Error";
import { dots } from "../services/dots";
import React from "react";

import { albumsOutline, todayOutline } from "ionicons/icons";

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
const Countries = () => {
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
			<IonContent color="dark">
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Countries</IonTitle>
					</IonToolbar>
				</IonHeader>
				{countriesData && (
					<div className="grid grid-cols-1 gap-y-4 p-4 text-white">
						{countriesFilter.map((c: Country) => {
							return (
								<a
									key={c.ID}
									className="rounded-xl"
									href={"/country/" + c.Slug}
									style={{
										backgroundImage:
											`url(https://purecatamphetamine.github.io/country-flag-icons/3x2/` +
											c.CountryCode +
											`.svg)`,
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
										backgroundSize: "200%",
									}}
								>
									<div className="p-5 w-full h-full bg-black bg-opacity-75 rounded-xl">
										<p className="text-center uppercase text-2xl font-black mb-3">
											{c.Country}
										</p>
										<div className="flex flex-col space-y-3 justify-center items-center">
											<div>
												<p className="text-base text-center">
													Confirmed
												</p>
												<div className="flex flex-row space-x-2 items-center">
													<div className="capitalize text-gray-400 text-sm bg-gray-700 rounded-md p-1 px-3 flex flex-row justify-center items-center space-x-4">
														<IonIcon
															icon={todayOutline}
															className="h-7 w-7"
															color="danger"
														/>
														<p className="text-base">
															{dots(
																c.NewConfirmed
															)}
														</p>
													</div>
													<div className="capitalize text-gray-400 text-sm bg-gray-700 rounded-md p-1 px-3  flex flex-row justify-center items-center space-x-4">
														<IonIcon
															icon={albumsOutline}
															className="h-7 w-7"
															color="danger"
														/>
														<p className="text-base">
															{dots(
																c.TotalConfirmed
															)}
														</p>
													</div>
												</div>
											</div>
											<div>
												<p className="text-base text-center">
													Deaths
												</p>
												<div className="flex flex-row space-x-2 items-center">
													<div className="capitalize text-gray-400 text-sm bg-gray-700 rounded-md p-1 px-3 flex flex-row justify-center items-center space-x-4">
														<IonIcon
															icon={todayOutline}
															className="h-7 w-7"
															color="danger"
														/>
														<p className="text-base">
															{dots(c.NewDeaths)}
														</p>
													</div>
													<div className="capitalize text-gray-400 text-sm bg-gray-700 rounded-md p-1 px-3  flex flex-row justify-center items-center space-x-4">
														<IonIcon
															icon={albumsOutline}
															className="h-7 w-7"
															color="danger"
														/>
														<p className="text-base">
															{dots(
																c.TotalDeaths
															)}
														</p>
													</div>
												</div>
											</div>
											<div>
												<p className="text-base text-center">
													Recovered
												</p>
												<div className="flex flex-row space-x-2 items-center">
													<div className="capitalize text-gray-400 text-sm bg-gray-700 rounded-md p-1 px-3 flex flex-row justify-center items-center space-x-4">
														<IonIcon
															icon={todayOutline}
															className="h-7 w-7"
															color="success"
														/>
														<p className="text-base">
															{dots(
																c.NewRecovered
															)}
														</p>
													</div>
													<div className="capitalize text-gray-400 text-sm bg-gray-700 rounded-md p-1 px-3  flex flex-row justify-center items-center space-x-4">
														<IonIcon
															icon={albumsOutline}
															className="h-7 w-7"
															color="success"
														/>
														<p className="text-base">
															{dots(
																c.TotalRecovered
															)}
														</p>
													</div>
												</div>
											</div>
										</div>
										<p className="text-right text-sm mt-2">
											{new Date(
												c.Date
											).toLocaleDateString()}
										</p>
									</div>
								</a>
							);
						})}
					</div>
				)}
				{error && <Error msg="Countries not found" />}
			</IonContent>
		</IonPage>
	);
};

export default Countries;
