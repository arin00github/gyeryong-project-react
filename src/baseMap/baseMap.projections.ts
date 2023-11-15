/** @constant 지도 종류 별 projection 정보 */
export const MAP_PROJECTIONS = {
    kakao: {
        resolution: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
        extent: [-30000, -60000, 494288, 988576],
        projectionName: "EPSG:5181",
        projection:
            "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
    },
    baro: {
        resolution: [
            2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255,
          ],
        extent: [-200000.0, -28024123.62, 31824123.62, 4000000.0],
        projectionName: "EPSG:5179",
        projection:
            "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
            matrixIds : [
                "L05",
                "L06",
                "L07",
                "L08",
                "L09",
                "L10",
                "L11",
                "L12",
                "L13",
                "L14",
                "L15",
                "L16",
                "L17",
                "L18",
              ],
            
    },
};
