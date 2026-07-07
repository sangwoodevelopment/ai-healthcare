function HospitalCard({ hospital, rightArea, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow p-6 hover:bg-slate-50 transition cursor-pointer"
        >
            <div className="flex justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold">
                        🏥 {hospital.name || hospital.hospitalName}
                    </h2>

                    <p className="text-slate-600 mt-2">📍 {hospital.address}</p>

                    <p className="text-slate-500 mt-1">☎ {hospital.phoneNumber}</p>

                    <span className="inline-block mt-3 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {hospital.department}
          </span>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                    {rightArea}
                </div>
            </div>
        </div>
    );
}

export default HospitalCard;