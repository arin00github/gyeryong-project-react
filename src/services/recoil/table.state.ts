import {atom} from 'recoil'



/** @returns {number} data table 의 페이징 처리를 위한 page number recoil state */
export const tablePageNumberState = atom<number>({
    key: 'tablePageNumberState',
    default: 1
})