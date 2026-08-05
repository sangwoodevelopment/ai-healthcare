import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import EmptyState from "./EmptyState";

ChartJS.register(ArcElement, Tooltip, Legend);

function DepartmentPieChart({ departmentStats }) {
    if (!departmentStats || departmentStats.length === 0) {
        return (
            <EmptyState
                icon="📊"
                title="분석 통계가 없습니다"
                description="AI 증상 분석을 진행하면 진료과 통계가 표시됩니다."
            />
        );
    }

    const data = {
        labels: departmentStats.map((item) => item.department),
        datasets: [
            {
                data: departmentStats.map((item) => item.count),
                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="max-w-md mx-auto">
            <Pie data={data} />
        </div>
    );
}

export default DepartmentPieChart;