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
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";

interface ParamType {
	id: string;
}

interface Difference {
	previous: number;
	actual: number;
}

const Country = () => {
	const { id } = useParams<ParamType>();
	const [countryData, setCountryData] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<Array<any>>([]);

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
		const data: Array<any> = countryData.reduce((allDates: any, d: any) => {
			return [
				...allDates,
				{
					Date: new Date(d.Date).toLocaleDateString(),
					Deaths: d.Deaths,
					Recovered: d.Recovered,
					Active: d.Active,
					Confirmed: d.Confirmed,
				},
			];
		}, []);
		setData(data);
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
					<div className="flex h-full w-full items-center px-4 pt-10 py-24">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								width={1}
								height={1}
								data={data}
								margin={{
									top: 0,
									right: 0,
									left: 0,
									bottom: 0,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="Date" />
								<YAxis />
								<Tooltip />
								<Area
									type="monotone"
									dataKey="Deaths"
									stackId="1"
									stroke="#FF0000"
									fill="#FF0000"
								/>
								<Area
									type="monotone"
									dataKey="Recovered"
									stackId="1"
									stroke="#00AD8B"
									fill="#00AD8B"
								/>
								<Area
									type="monotone"
									dataKey="Confirmed"
									stackId="1"
									stroke="#00609F"
									fill="#00609F"
								/>
								<Area
									type="monotone"
									dataKey="Active"
									stackId="1"
									stroke="#ffc658"
									fill="#ffc658"
								/>
								<Legend />
							</AreaChart>
						</ResponsiveContainer>
					</div>
				)}
				{error && <Error msg="Country not found" />}
			</IonContent>
		</IonPage>
	);
};

export default Country;
