/**
 * This is a template for the default spreadsheet.
 */
export default function createLogTemplate(name) {
  return {
    properties: {
      title: `${name}`,
    },
    sheets: [
      createTimeSheet('Time Log'),
      createTimeReport('Time Report'),
    ]
  }
}

function createTimeSheet(title) {
  return {
    properties: {
      title,
      gridProperties: {
        // We want the first row to be frozen
        frozenRowCount: 1
      },
    },
    data: [createLogHeaderRow()]
  };
}

function createTimeReport(title) {
  return {
    properties: {
      title,
      gridProperties: {
        // We want the first row to be frozen
        frozenRowCount: 1
      },
    },
    data: [{
      startRow: 0,
      startColumn: 0,
      rowData: {
        values: [
          formulaCell('=QUERY(\'Time Log\'!A:F,' +
          ' "select F, sum(C) where F is not null group by F pivot upper(D)")'),
        ]
      }
    }]
  }
}

function createLogHeaderRow() {
  return {
    startRow: 0,
    startColumn: 0,
    rowData: {
      values: [
        header('Start'),
        header('End'),
        header('Duration'),
        header('Who?'),
        header('What?'),
        formulaCell('=QUERY(A:A,"select toDate(A) label toDate(A) \'Date\'")')
      ]
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

function formulaCell(text) {
  return {
    userEnteredValue: {
      formulaValue: text
    }
  }
}
