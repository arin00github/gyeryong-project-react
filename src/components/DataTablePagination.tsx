import { ChevronsLeft, ChevronsRight } from "react-feather";
import styled from "styled-components";

interface DataTablePaginationProps {
    currentPageNumber: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    maxPageCount: number;
    totalCount: number;
}


const DataTablePagination = (props:DataTablePaginationProps) => {


    const {currentPageNumber, totalPages, onPageChange, maxPageCount, totalCount} = props;

    let startPage = Math.max(1, currentPageNumber - Math.floor(maxPageCount /2));

    const endPage = Math.min(startPage + maxPageCount - 1, totalPages);

    if(endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageCount + 1);
    }

    const pageNumbers = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);

    /**
     * @name handlePageChange
     * @description 페이지 변경 이벤트 핸들러
     * @param {number} pageNumber 변경할 페이지 번호
     */
    const handlePageChange = (pageNumber: number) => {
        onPageChange(pageNumber)
    }

    return (
        <PaginationContainer>
            <PaginationNav>
                <PaginationList>
                  <PaginationItem $isButton $isDisabled={currentPageNumber === 1 ? true : false}
                  onClick={() => handlePageChange(1)}>
                     <ChevronsLeft />
                  </PaginationItem>
                  <PaginationItem $isButton $isDisabled={currentPageNumber === 1 ? true : false}
                  onClick={() => handlePageChange(Math.max(1, currentPageNumber - 1))}>
                     <ChevronsLeft />
                  </PaginationItem>
                  {
                    totalPages > 0 ? (
                    pageNumbers.map((page, idx) => (
                        <PaginationItem key={idx} $isActive={currentPageNumber === page ? true : false}
                        className={`${page === currentPageNumber ? "active" : ""}`}
                        onClick={() => handlePageChange(page)}>
                            {page}
                        </PaginationItem>
                    
                    ))
                    ) : (
                        <PaginationItem key="-">-</PaginationItem>
                    )
                  }
                  <PaginationItem $isButton $isDisabled={currentPageNumber === 1 ? true : false}
                  onClick={() => handlePageChange(Math.min(totalPages, currentPageNumber + 1))}>
                     <ChevronsRight />
                  </PaginationItem>
                  <PaginationItem $isButton $isDisabled={currentPageNumber === 1 ? true : false}
                  onClick={() => handlePageChange(totalPages)}>
                     <ChevronsRight />
                  </PaginationItem>
                </PaginationList>
            </PaginationNav>
        </PaginationContainer>
    )
}

const PaginationContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
`;

const PaginationList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    gap: 4px;
`;


const PaginationNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PaginationItem = styled.li<{ $isActive?: boolean; $isButton?: boolean; $isDisabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    color: #888;
    font-size: 15px;
    cursor: pointer;
    ${props => props.$isButton && "border: 1px solid #5c5c5c; background: hsla(0, 0%, 100%, 0.18);"}
    ${props => props.$isActive && "color: #3080d0; text-decoration: underline;"}
    ${props => props.$isDisabled && "cursor: not-allowed; pointer-events: none; opacity: 0.5;"}
`;

const PaginationTotalCountContainer = styled.div`
    position: absolute;
    right: 0;
    margin-bottom: 2px;
    strong {
        color: #f3f3f3;
        font-size: 13px;
        font-weight: 400;
        margin-right: 8px;
    }
`;

export default DataTablePagination;