function HospitalCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow p-6 animate-pulse">
            <div className="flex justify-between gap-4">
                <div className="flex-1">
                    <div className="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded-full w-24"></div>
                </div>

                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            </div>
        </div>
    );
}

export default HospitalCardSkeleton;