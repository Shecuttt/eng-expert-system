// Skeleton.js hanya untuk percobaan
const Skeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex justify-between space-x-3 p-3 bg-gray-300 rounded mb-2">
                <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
            </div>
            {/* Repeat for as many rows as you want to show */}
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="flex justify-between space-x-3 p-3 bg-gray-300 rounded mb-2"
                >
                    <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
                    <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
                    <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
                    <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
