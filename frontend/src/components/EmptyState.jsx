function EmptyState({ icon = "🔍", title, description }) {
    return (
        <div className="text-center bg-white rounded-2xl shadow p-10 mt-8">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500">{description}</p>
        </div>
    );
}

export default EmptyState;