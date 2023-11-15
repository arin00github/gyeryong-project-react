import { atom } from "recoil";




/** @returns {string | number | undefined} 자산 목록에서 선택한 자산 id 정보 */
export const selectedAssetIdState = atom<string | number | undefined>({
    key: "selectedAssetIdState",
    default: undefined,
});