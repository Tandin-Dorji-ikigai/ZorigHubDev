import React from 'react';

const activityItems = [
    {
        color: 'green',
        title: 'New artisan registered',
        subtitle: 'Pema Wangmo joined the platform',
        time: '2 hours ago'
    },
    {
        color: 'blue',
        title: 'Large order placed',
        subtitle: 'Order #1234 worth BTN 15,000',
        time: '4 hours ago'
    },
    {
        color: 'yellow',
        title: 'Product review submitted',
        subtitle: '5-star review for silk scarf',
        time: '6 hours ago'
    },
    {
        color: 'purple',
        title: 'New buyer registered',
        subtitle: 'Alice Johnson created account',
        time: '8 hours ago'
    }
];

const RecentActivity = () => {
    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
                {activityItems.map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 mt-2 rounded-full bg-${item.color}-500`}></div>
                        <div>
                            <p className="text-sm text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.subtitle}</p>
                            <p className="text-xs text-gray-400">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
