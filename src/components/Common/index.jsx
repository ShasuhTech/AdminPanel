
export function exportToCSV(data, name) {
    const headerRow = Object?.keys(data[0])
    const csvRows = []

    csvRows.push(headerRow.join(','))

    for (const row of data) {
      const values = headerRow.map(header => row[header])
      csvRows.push(values.join(','))
    }

    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name ||'Pending Approvals.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

