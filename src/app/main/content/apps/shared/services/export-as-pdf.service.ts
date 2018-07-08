import { Injectable } from '@angular/core';
declare let jsPDF;

@Injectable()
export class ExportAsPdfService {

    constructor() { }

    exportGridData(columns, gridData, fileName, pageTitle) {
        // Only pt supported (not mm or in)
        const doc = new jsPDF('p', 'pt');
        doc.text(35, 25, pageTitle);
        doc.autoTable(columns, gridData, {
            // Styling
            theme: 'grid', // 'striped', 'grid' or 'plain'
            styles: {},
            headerStyles: {},
            bodyStyles: {},
            alternateRowStyles: {},
            columnStyles: {},
            // Properties
            startY: false, // false (indicates margin top value) or a number
            margin: 40, // a number, array or object
            pageBreak: 'auto', // 'auto', 'avoid' or 'always'
            tableWidth: 'auto', // 'auto', 'wrap' or a number,
            showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
            tableLineColor: 200, // number, array (see color section below)
            tableLineWidth: 0,
            // Hooks
            createdHeaderCell: function (cell, data) {},
            createdCell: function (cell, data) {
                const dataKeyParts = data.column.raw.dataKey.split('.');
                if (dataKeyParts.length > 1) {
                    let o = data.row.raw;
                    dataKeyParts.forEach(key => {(o !== null || o !== '') ? o = o[key] : ''});
                    cell.text = o;
                }
            },
            drawHeaderRow: function (row, data) {},
            drawRow: function (row, data) {},
            drawHeaderCell: function (cell, data) {},
            drawCell: function (cell, data) {},
            addPageContent: function (data) {}
         });
        doc.save(fileName + '.pdf');
    }
}
