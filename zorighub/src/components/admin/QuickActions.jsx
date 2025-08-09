import React from 'react';

const QuickActions = () => {
    const actions = [
        { icon: 'fa-plus', label: 'Add New Product' },
        { icon: 'fa-user-plus', label: 'Invite Artisan' },
        { icon: 'fa-file-export', label: 'Export Data' },
        { icon: 'fa-cog', label: 'System Settings' },
    ];

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, i) => (
                    <button
                        key={i}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <i className={`fas ${action.icon} mr-2 text-red-600`}></i>
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
