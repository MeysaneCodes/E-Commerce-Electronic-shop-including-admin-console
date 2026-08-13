import {number} from "zod";

type props = {
    rows: number;
    columns: number;
    col_titles: string[];
    row_titles: string[];
    row_contents: Array<JSX.Element[]>,
}


export default function TableGenerator({ params }: { params: props }) {
    return (
        <div
            className="grid gap-0"
            style={{ gridTemplateColumns: `repeat(${params.columns}, 1fr)` }}
        >
            {/* Column headers */}
            {params.col_titles.map((title, i) => (
                <div key={i} className="bg-gray-100 font-bold p-2">
                    {title}
                </div>
            ))}

            {/* Table body */}
            {params.row_contents.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className="bg-white p-2"
                    >
                        {cell}
                    </div>
                ))
            )}
        </div>
    );
}