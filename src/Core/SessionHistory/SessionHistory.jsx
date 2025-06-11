import { useMemo, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

// const data = [
//     { rating: 9, date: '2025-06-10', time: '14:30', message: 'Excellent support!' },
//     { rating: 6, date: '2025-06-09', time: '11:00', message: 'Could be better.' },
//     { rating: 8, date: '2025-06-08', time: '15:45', message: 'Very satisfied!' },
//     { rating: 3, date: '2025-06-07', time: '09:20', message: 'Not great experience.icisiijsvnodfrijbojtejtjbbjeojosijoisrjojr' },
//     { rating: null, date: '2025-06-06', time: '17:10', message: 'No comments.' },
//     { rating: 10, date: '2025-06-05', time: '12:00', message: 'Perfect!' },
//     { rating: 5, date: '2025-06-04', time: '10:30', message: 'Average session.' },
// ];

const SessionHistory = () => {
    const [filterType, setFilterType] = useState('all'); // all, good, bad
    const [selectedRating, setSelectedRating] = useState('');
    const [data, setData] = useState(() => {
        const stored = localStorage.getItem('sessionFeedbacks');
        return stored ? JSON.parse(stored) : [];
    });

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            if (filterType === 'good') return item.rating >= 7;
            if (filterType === 'bad') return item.rating !== null && item.rating < 7;
            if (selectedRating) return item.rating === parseInt(selectedRating);
            return true;
        });
    }, [filterType, selectedRating]);

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

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
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
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
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
