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
import Error from "../components/Error";
import Loading from "../components/Loading";
import { Bar } from "react-chartjs-2";

interface ParamType {
	id: string;
}

const o = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

const Country = () => {
	const { id } = useParams<ParamType>();
	const [countryData, setCountryData] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [deaths, setDeaths] = useState();
	const [confirmed, setConfirmed] = useState();
	const [active, setActive] = useState();
	const [recovered, setRecovered] = useState();

	const [options, setOptions] = useState(o);

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const data = await country(id);
				setCountryData(data);
			} catch (error) {
				setError(error);
			}
			setIsLoading(false);
		};
		getData();
	}, [id]);

	useEffect(() => {
		const deaths: any = {
			labels: countryData.reduce((allDates: any, date: any) => {
				return [...allDates, ""];
			}, []),
			title: {
				text: "Deaths",
			},
			datasets: [
				{
					label: "Deaths",
					data: countryData.reduce((allDates: any, date: any) => {
						const index = allDates.length - 1;
						const dataAnterior: any = countryData[index];
						const diff =
							allDates.length > 1
								? date.Deaths - dataAnterior.Deaths
								: date.Deaths;
						return [...allDates, diff > 0 ? diff : 0];
					}, []),
					tension: 0,
					borderColor: "rgb(248,169,113)",
					backgroundColor: "rgba(0,0,0,0)",
					radius: 0,
					borderWidth: 1,
					pointHitRadius: 2,
				},
			],
		};
		const confirmed: any = {
			labels: countryData.reduce((allDates: any, date: any) => {
				return [...allDates, ""];
			}, []),
			title: {
				text: "Confirmed",
			},
			datasets: [
				{
					label: "Confirmed",
					data: countryData.reduce((allDates: any, date: any) => {
						const index = allDates.length - 1;
						const dataAnterior: any = countryData[index];
						const diff =
							allDates.length > 1
								? date.Confirmed - dataAnterior.Confirmed
								: date.Confirmed;
						return [...allDates, diff > 0 ? diff : 0];
					}, []),
					tension: 0,
					borderColor: "rgb(248,169,113)",
					backgroundColor: "rgba(0,0,0,0)",
					radius: 0,
					borderWidth: 1,
					pointHitRadius: 2,
				},
			],
		};

		const active: any = {
			labels: countryData.reduce((allDates: any, date: any) => {
				return [...allDates, ""];
			}, []),
			title: {
				text: "Active",
			},
			datasets: [
				{
					label: "Active",
					data: countryData.reduce((allDates: any, date: any) => {
						const index = allDates.length - 1;
						const dataAnterior: any = countryData[index];
						const diff =
							allDates.length > 1
								? date.Active - dataAnterior.Active
								: date.Active;
						return [...allDates, diff > 0 ? diff : 0];
					}, []),
					tension: 0,
					borderColor: "rgb(248,169,113)",
					backgroundColor: "rgba(0,0,0,0)",
					radius: 0,
					borderWidth: 1,
					pointHitRadius: 2,
				},
			],
		};

		const recovered: any = {
			labels: countryData.reduce((allDates: any, date: any) => {
				return [...allDates, ""];
			}, []),
			title: {
				text: "Recovered",
			},
			datasets: [
				{
					label: "Recovered",
					data: countryData.reduce((allDates: any, date: any) => {
						const index = allDates.length - 1;
						const dataAnterior: any = countryData[index];
						const diff =
							allDates.length > 1
								? date.Recovered - dataAnterior.Recovered
								: date.Recovered;
						return [...allDates, diff > 0 ? diff : 0];
					}, []),
					tension: 0,
					borderColor: "rgb(248,169,113)",
					backgroundColor: "rgba(0,0,0,0)",
					radius: 0,
					borderWidth: 1,
					pointHitRadius: 2,
				},
			],
		};
		setDeaths(deaths);
		setConfirmed(confirmed);
		setActive(active);
		setRecovered(recovered);
	}, [countryData]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{id}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color="dark">
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">{id}</IonTitle>
					</IonToolbar>
				</IonHeader>
				{isLoading && <Loading />}
				{countryData && (
					<div className="grid grid-cols-1 gap-y-4 p-4 text-white">
						<Bar data={deaths} type="number" options={options} />
						<Bar data={confirmed} type="number" options={options} />
						<Bar data={active} type="number" options={options} />
						<Bar data={confirmed} type="number" options={options} />
					</div>
				)}
				{error && <Error msg="Country not found" />}
			</IonContent>
		</IonPage>
	);
};

export default Country;
