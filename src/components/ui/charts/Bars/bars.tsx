import { BarChart } from '@mui/x-charts/BarChart';

export default function CustomLabels() {
    const hours = [
        '2 am', '4 am', '6 am', '8 am', '10 am', '12 pm',
        '14 pm', '16 pm', '18 pm', '20 pm', '22 pm', '24 pm',
    ];

    const TotalSale = [
        18000, 20000, 10000, 18000, 25000, 18000,
        10000, 20000, 40000, 8000, 30000, 20000,
    ];

    const TotalPurchase = [
        40000, 30000, 30000, 50000, 40000, 50000,
        30000, 30000, 50000, 30000, 40000, 30000,
    ];

    return (
        <BarChart
            grid={{horizontal:true}}
            sx={{
                '& .MuiChartsGrid-line': {
                    strokeDasharray: '4 6',   // 👈 dashed pattern
                    stroke: '#E5E7EB',        // light gray
                    strokeWidth: 1,
                },
            }}
            xAxis={[
                {
                    scaleType: 'band',
                    data: [
                        '2 am', '4 am', '6 am', '8 am', '10 am', '12 pm',
                        '14 pm', '16 pm', '18 pm', '20 pm', '22 pm', '24 pm',
                    ],
                },
            ]}

            yAxis={[
                {
                    disableLine: true,
                    disableTicks: false,
                    valueFormatter: (v:number) => `${v / 1000}K`,
                },
            ]}

            series={[
                {
                    data: TotalSale,
                    stack: 'total',
                    label: 'Total Sale',
                    color: '#FF9380', // darker orange
                },
                {
                    data: TotalPurchase,
                    stack: 'total',
                    label: 'Total Purchase',
                    color: '#FF6142', // light orange
                },
            ]}
            height={350}
            margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
            barLabel={(item) =>
                item.value && item.value >= 40000 ? `${item.value / 1000}K` : null
            }
        />
    );
}