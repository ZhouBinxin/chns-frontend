/**
 * @description map排序函数，按key从小到大排序
 * @author VanHelsing
 * @Date 2020/12/5
 */
/* eslint-disable */
const sort = (xData, yData) => {
    let x, y;
    for (let i = 0; i <= yData.length; i++) {
        for (let j = i + 1; j <= yData.length; j++) {
            if (yData[i] >= yData[j]) {
                y = yData[j];
                yData[j] = yData[i];
                yData[i] = y;
                x = xData[j];
                xData[j] = xData[i];
                xData[i] = x;
            }
        }
    }
}

export default sort