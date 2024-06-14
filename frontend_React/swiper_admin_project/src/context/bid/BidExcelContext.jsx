import {createContext} from "react";
import {saveAs} from "file-saver";
import * as Excel from "exceljs/dist/exceljs.min";

export const BidExcelContext = createContext({});
export const BidExcelProvider = ({children}) => {
    // TH에 들어갈 텍스트 데이터
    const NewSheaders = ["낙찰일", "발주처", "용역명", "구분", "비율", "낙찰가", "비고"];
    // TH width, 단위는 cell의 width나 height 단위는 픽셀이 아닌 엑셀의 너비 기준이다.
    const NewsHeaderWidths = [10, 10, 10, 10, 10, 10, 10, 10];

    //낙찰 엑셀양식
    const ExcelDownload = async (rows) => {
        try {
            const wb = new Excel.Workbook();
            const sheet = wb.addWorksheet("낙찰 양식 파일");
            const headerRow = sheet.addRow(NewSheaders);
            headerRow.height = 25.75;
            headerRow.eachCell((cell, colNum) => {
                styleHeaderCell(cell);
                sheet.getColumn(colNum).width = NewsHeaderWidths[colNum - 1];
            });

            rows.forEach(({sbid_date, sbid_devi, sbid_name, sbid_order, sbid_rate, sbid_cost, sbid_note}) => {
                const rowDatas = [sbid_date, sbid_devi, sbid_name, sbid_order, sbid_rate, sbid_cost, sbid_note];
                const appendRow = sheet.addRow(rowDatas);

                appendRow.eachCell((cell, colNum) => {
                    styleDataCell(cell, colNum);
                    if (colNum === 1) {
                        cell.font = {
                            color: {argb: "ff1890ff"},
                        };
                    }
                    if (colNum === 3) {
                        cell.numFmt = "0,000";
                    }
                });
            });

            // 파일 생성
            const fileData = await wb.xlsx.writeBuffer();
            const blob = new Blob([fileData], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, `낙찰 양식파일`);
        } catch (error) {
            console.log(error);
        }
    }

    //입찰 엑셀 양식
    // TH에 들어갈 텍스트 데이터
    const StateSheaders = ["발주처", "용역명", "구분", "금액", "입찰 시작일", "입찰 종료일", "비고"];
    // TH width, 단위는 cell의 width나 height 단위는 픽셀이 아닌 엑셀의 너비 기준이다.
    const StateHeaderWidths = [10, 10, 10, 10, 15, 15, 10];

    const ExcelStateDownload = async (rows) => {
        try {
            const wb = new Excel.Workbook();
            const sheet = wb.addWorksheet("입찰 양식 파일");
            const headerRow = sheet.addRow(StateSheaders);
            headerRow.height = 25;
            headerRow.eachCell((cell, colNum) => {
                styleHeaderCell(cell);
                sheet.getColumn(colNum).width = StateHeaderWidths[colNum - 1];
            });

            rows.forEach(({bid_devi,bid_name,bid_order,bid_cost,bid_start_date,bid_end_date,bid_note}) => {
                const rowDatas = [bid_devi,bid_name,bid_order,bid_cost,bid_start_date,bid_end_date,bid_note];
                const appendRow = sheet.addRow(rowDatas);

                appendRow.eachCell((cell, colNum) => {
                    styleDataCell(cell, colNum);
                    if (colNum === 1) {
                        cell.font = {
                            color: {argb: "ff1890ff"},
                        };
                    }
                    if (colNum === 3) {
                        cell.numFmt = "0,000";
                    }
                });
            });

            // 파일 생성
            const fileData = await wb.xlsx.writeBuffer();
            const blob = new Blob([fileData], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, `입찰 양식파일`);
        } catch (error) {
            console.log(error);
        }
    }

    const styleHeaderCell = (cell) => {
    };
    const styleDataCell = (cell) => {
    };

    return (
        <BidExcelContext.Provider value={{
            ExcelDownload,
            ExcelStateDownload
        }}>
            {children}
        </BidExcelContext.Provider>
    )
}
