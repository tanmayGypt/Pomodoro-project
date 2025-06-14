import { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { JsonToExcel } from 'react-json-to-excel';

const SessionHistory = () => {
    const [filterType, setFilterType] = useState('all');
    const [selectedRating, setSelectedRating] = useState('');
    const [data] = useState(() => {
        const stored = localStorage.getItem('sessionFeedbacks');
        return stored ? JSON.parse(stored) : [];
    });

    const filteredData = data.filter((item) => {
        if (filterType === 'good') return item.rating >= 7;
        if (filterType === 'bad') return item.rating !== null && item.rating < 7;
        if (selectedRating) return item.rating === parseInt(selectedRating);
        return true;
    });

    const columns = useMemo(() => [
        {
            Header: 'S.No',
            accessor: (_, index) => index + 1
        },
        {
            Header: 'Rating',
            accessor: 'rating',
            Cell: ({ value }) => (value != null ? value : 'No rating'),
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Time',
            accessor: 'time',
        },
        {
            Header: 'Review Message',
            accessor: 'message',
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data: filteredData });

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded shadow-sm">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Rating Reviews</h1>

            <div className="flex justify-between items-end flex-wrap gap-4 mb-6">
                {/* Left: Filters */}
                <div className="flex flex-wrap gap-6">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Filter by Type</label>
                        <select
                            value={filterType}
                            onChange={(e) => {
                                setFilterType(e.target.value);
                                setSelectedRating('');
                            }}
                            className="border px-3 py-2 rounded shadow-sm"
                        >
                            <option value="all">All</option>
                            <option value="good">Good (7+)</option>
                            <option value="bad">Bad (&lt;7)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Filter by Rating</label>
                        <select
                            value={selectedRating}
                            onChange={(e) => {
                                setSelectedRating(e.target.value);
                                setFilterType('all');
                            }}
                            className="border px-3 py-2 rounded shadow-sm"
                        >
                            <option value="">All Ratings</option>
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right: Download Buttons */}
                <div className="flex gap-3">
                    <JsonToExcel
                        data={filteredData}
                        fileName="session_feedback"
                        title="Download Excel"
                        btnClassName="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
                    />

                    <button
                        onClick={() => {
                            const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
                                type: 'application/json',
                            });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'session_feedback.json';
                            link.click();
                            URL.revokeObjectURL(url);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                    >
                        Download JSON
                    </button>
                </div>
            </div>


            {/* Table */}
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full table-auto border border-gray-300">
                    <thead className="bg-gray-100 text-gray-700">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="p-3 text-left border-b">
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="p-3 border-b text-sm text-gray-700">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                        {rows.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No matching records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SessionHistory;
