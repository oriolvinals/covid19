import {
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { globalData } from "../services/api";
import { useEffect, useState } from "react";
import {
	checkmarkDoneOutline,
	happyOutline,
	skullOutline,
} from "ionicons/icons";
import Error from "../components/Error";
import { dots } from "../services/dots";
import Loading from "../components/Loading";

interface Global {
	TotalConfirmed: number;
	TotalDeaths: number;
	TotalRecovered: number;
}

const Home = () => {
	const [data, setData] = useState<Global>();
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const data = await globalData();
				setData(data);
			} catch (error) {
				setError(error);
			}
			setIsLoading(false);
		};

		getData();
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>World Covid Data</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color="dark">
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">World Covid Data</IonTitle>
					</IonToolbar>
				</IonHeader>
				{isLoading && <Loading />}
				{data && (
					<div className="flex h-full w-full items-center">
						<div className="grid grid-cols-1 gap-y-2 p-2 w-full">
							<div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row items-center space-x-3">
								<IonIcon
									icon={checkmarkDoneOutline}
									size="large"
									color="danger"
								/>
								<div>
									<p className="leading-relaxed text-1xl">
										Total Confirmed
									</p>
									<h2 className="title-font font-medium text-2xl text-gray-900">
										{dots(data.TotalConfirmed)}
									</h2>
								</div>
							</div>
							<div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row items-center space-x-3">
								<IonIcon
									icon={skullOutline}
									size="large"
									color="danger"
								/>
								<div>
									<p className="leading-relaxed text-1xl">
										Total Deaths
									</p>
									<h2 className="title-font font-medium text-2xl text-gray-900">
										{dots(data.TotalDeaths)}
									</h2>
								</div>
							</div>
							<div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-row items-center space-x-3">
								<IonIcon
									icon={happyOutline}
									size="large"
									color="success"
								/>
								<div>
									<p className="leading-relaxed text-1xl">
										Total Recovered
									</p>
									<h2 className="title-font font-medium text-2xl text-gray-900">
										{dots(data.TotalRecovered)}
									</h2>
								</div>
							</div>
						</div>
					</div>
				)}
				{error && <Error msg="World data not found" />}
			</IonContent>
		</IonPage>
	);
};

export default Home;
