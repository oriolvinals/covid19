const Loading = () => {
	return (
		<div className="fixed z-50 inset-1/4 flex items-center justify-center">
			<img
				src={"/assets/loading.png"}
				alt="Loader icon"
				className="animate-spin -ml-1 mr-3 h-20 w-20 text-white"
			/>
		</div>
	);
};

export default Loading;
