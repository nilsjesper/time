/**
 * This is a template for the default spreadsheet.
 */
export default function createLogTemplate(name, fields) {
  return {
    properties: {
      title: `${name}`,
    },
    sheets: createTimeSheet('Time Log', fields)
  }
}

function createTimeSheet(title, fields) {
  return {
    properties: {
      title,
      gridProperties: {
        // We want the first row to be frozen
        frozenRowCount: 1,
        // And we need only first five columns (start/end/duration/who/what)
        frozenColumnCount: 5,
      },
    },
    data: [createHeaderRow(fields)]
  };
}

function createHeaderRow(fields) {
  const headers = [
    header('Start'),
    header('End'),
    header('Duration')
  ]

  // add any custom fields
  fields.split(',').forEach(field => headers.push(header(field)))

  return {
    startRow: 0,
    startColumn: 0,
    rowData: {
      values: headers
    }
  };
}

function header(text) {
  return {
    userEnteredValue: {
      stringValue: text
    },
    userEnteredFormat: {
      horizontalAlignment: 'CENTER',
      textFormat: {
        bold: true,
      },
    },
  };
}
