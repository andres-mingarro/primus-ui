import './DataTable.scss'

type DataTableProps = {
  columns: string[]
  rows: string[][]
}

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="app-data-table">
      <table className="app-data-table__table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join(':')}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`}>
                  {index < 2 ? <code>{cell}</code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
