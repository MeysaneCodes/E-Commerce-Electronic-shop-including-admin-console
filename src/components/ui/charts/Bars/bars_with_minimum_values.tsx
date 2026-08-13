import { BarChart } from '@mui/x-charts/BarChart';

export default function CustomLabels_WithNegativeValues() {
    const hours = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun',
        'Jul', 'Aug', 'Okt', 'Sep', 'Nov', 'Dec',
    ];

    const TotalSale = [
        18000, 20000, 10000, 18000, 25000, 18000,
        10000, 20000, 40000, 8000, 30000, 20000,
    ];

    const TotalPurchase = [
        40000, 30000, 30000, 50000, 40000, 50000,
        30000, -30000, -50000, -30000, 40000, 30000,
    ];

    return (
        <BarChart

            grid={{horizontal:true}}
            sx={{
                '& .MuiChartsGrid-line': {
                    stroke: '#E5E7EB',        // light gray
                    strokeWidth: 1,
                },
            }}
            xAxis={[
                {

                    tickPlacement: "middle",
                    scaleType: 'band',
                    data: [...hours
                    ],
                    categoryGapRatio: 0.6

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
                    color: 'green', // darker orange
                },
                {
                    data: TotalPurchase,
                    stack: 'total',
                    label: 'Total Purchase',
                    color: 'red', // light orange
                },
            ]}
            height={350}
            margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
        />
    );
}