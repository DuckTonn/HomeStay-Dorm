import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import RefreshIcon from "@/assets/icons/Refresh.svg";
interface SummaryCardProps {
    title: string;
    value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => (
    <div className="bg-secondary rounded-xl p-3 text-white flex flex-col justify-between shadow-lg">
        <span className="text-size-2xl be-vietnam-pro-bold">{value}</span>
        <span className="be-vietnam-pro-light text-size-small h-[1.5rem] md:h-[3rem]">{title}</span>
    </div>
);

const ReportsStatistics = () => {
    const chartData = [
        { month: '1', thuNhập: 320 },
        { month: '2', thuNhập: 550 },
        { month: '3', thuNhập: 320 },
        { month: '4', thuNhập: 550 },
        { month: '5', thuNhập: 320 },
        { month: '6', thuNhập: 320 },
        { month: '7', thuNhập: 550 },
        { month: '8', thuNhập: 550 },
        { month: '9', thuNhập: 320 },
        { month: '10', thuNhập: 320 },
        { month: '11', thuNhập: 320 },
        { month: '12', thuNhập: 320 },
    ];

    const tableData = [
        { month: 'Tháng 1', count: 100 },
        { month: 'Tháng 2', count: 100 },
        { month: 'Tháng 3', count: 100 },
        { month: 'Tháng 4', count: 100 },
        { month: 'Tháng 5', count: 100 },
        { month: 'Tháng 6', count: 100 },
        { month: 'Tháng 7', count: 100 },
        { month: 'Tháng 8', count: 100 },
        { month: 'Tháng 9', count: 100 },
        { month: 'Tháng 10', count: '......' },
        { month: 'Tháng 11', count: '......' },
        { month: 'Tháng 12', count: '......' },
    ];

    return (
        <div className="w-full h-[85vh] bg-white rounded-2xl border border-DarkOutline shadow-lg p-6 flex flex-col md:flex-row gap-6">

            <div className="flex flex-col gap-4 flex-1">
                {/* Top Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    < SummaryCard title="Tài khoản người dùng" value="2500" />
                    < SummaryCard title="Tài khoản nhân viên" value="2500" />
                    < SummaryCard title="Khách đang thuê phòng" value="2500" />
                    < SummaryCard title="Tháng trọ chưa trả" value="2500" />
                </div>

                {/* Bar Chart Section */}
                <div className="flex-1 flex flex-col gap-2">

                    <div className="flex flex-row gap-2 justify-start items-center">
                        <p className="be-vietnam-pro-regular text-size-base">Tiền thu được theo tháng</p>
                        <p className="be-vietnam-pro-regular text-size-base px-2 py-1 border border-DarkOutline rounded-sm">2026</p>

                        <div className="p-1.5 flex justify-center items-center rounded-full bg-secondary ml-3">
                            <img src={RefreshIcon} className='w-3.5 h-3.5' />
                        </div>
                    </div>

                    <div className="flex-1 border border-LightOutline rounded-xl p-4 overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={{ stroke: '#9CA3AF' }}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={{ stroke: '#9CA3AF' }}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    domain={[0, 600]}
                                    ticks={[0, 100, 200, 300, 400, 500]}
                                />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="thuNhập" fill="#98CDAE" radius={[2, 2, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="w-full md:w-1/3 flex flex-col">
                <h3 className="be-vietnam-pro-medium text-size-base mb-4 text-center">Số lượng khách thuê phòng trong năm 2026</h3>
                <div className="flex-1 border border-LightOutline rounded-xl overflow-hidden flex flex-col">
                    <div className="overflow-y-auto flex-1 no-scrollbar">
                        <table className="w-full text-center be-vietnam-pro-light text-size-small border-collapse">
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr key={index} className="border-b border-LightOutline last:border-b-0">
                                        <td className="py-2.5 px-4 text-left border-r border-LightOutline w-1/2">{row.month}</td>
                                        <td className="py-2.5 px-4 text-right be-vietnam-pro-medium">{row.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ReportsStatistics;
