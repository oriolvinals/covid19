interface Props {
	msg: string;
}

const Error = ({ msg }: Props) => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<h2 className="text-3xl text-center">{msg}</h2>
		</div>
	);
};

export default Error;
