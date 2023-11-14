import { AccessorFn, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import styled from "styled-components";
import { TanstackReactTable } from "../../styles/table.style";
import { ColumnConfig } from "../../interfaces/common.interface";
import DataTablePagination from "./DataTablePagination";


interface DataTableProps<T> {
      /** 테이블 생성이 필요한 설정 정보 */
    config: {
        /** table 데이터 목록으로 표시될 데이터 배열, Generic Type */
        tableData: T[];
        /** table 헤더로 표시될 컬럼 설정 배열 */
        tableColumnConfig: ColumnConfig[];
        /** 전체데이터 갯수 */
        totalCount: number;
    }
}

const DataTable = <T extends object>(props: DataTableProps<T>) => {
   
    const {config} = props;

    const {tableData, tableColumnConfig, totalCount} = config;

    /** 현재 페이지 번호 */
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);  

    /** 총 페이지 수 */
    const totalPages = Math.ceil(totalCount / 10);

    /**
     * @name handlePageChange
     * @description 페이지 변경 이벤트 핸들러
     * @param pageNumber 변경할 페이지 번호
     */
    const handlePageChange = (pageNumber: number) => {
        setCurrentPageNumber(pageNumber)
    }
    
    const columnHelper = createColumnHelper<T>();
    const columns = tableColumnConfig.map((col:ColumnConfig) => {
        const columnKey = col.column as unknown as AccessorFn<T>;
        return columnHelper.accessor(columnKey, {
            header: col.columnName,
            cell: props => {
                return `${props.getValue() || '-'}${col.dimension || ''}`
            }
        })
    })

    const projectTable = useReactTable({
        data: tableData,
        columns,
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <TableWrap>
            <TableContainer>
                <TanstackReactTable>
                    <thead>
                        {projectTable.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    if(header.id !== 'uid'){
                                        return (
                                            <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
                                        )
                                    }else {
                                        return null
                                    }
                                })}
                            </TableRow>
                        ))}
                    </thead>
                    <tbody>
                        {projectTable.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    if(cell.column.id !== 'uid'){
                                        return (
                                            <td key={cell.id} style={{width: cell.column.getSize()}}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                            </TableRow>
                        ))}
                    </tbody>
                </TanstackReactTable>
            </TableContainer>
            <DataTablePagination currentPageNumber={currentPageNumber} totalPages={totalPages} onPageChange={handlePageChange} maxPageCount={10} totalCount={totalCount}/>
        </TableWrap>
    )
}

const TableContainer = styled.div`
    position: relative;
    width: 100%;
`

const TableWrap = styled.div`
    width: 100%;
`;

const TableRow = styled.tr`
    width: 100%;
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #2d2d2d;
`

export default DataTable;