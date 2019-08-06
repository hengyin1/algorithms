function comparator(a, b) {
    return a - b;
}

function bubbleSort(array, compare) {//冒泡排序
    compare = compare || comparator;
    let temp;
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (compare(array[j], array[j - 1]) < 0) {
                temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        }
    }

    return array;
}

function insertSort(array, compare) {//插入排序
    compare = compare || comparator;
    for (let i = 1; i < array.length; i++) {
        let temp = array[i];
        let j = i - 1;
        for (; j >= 0; j--) {
            if (compare(temp, array[j]) < 0) {
                array[j + 1] = array[j];
            } else {
                break;
            }
        }
        array[j + 1] = temp;
    }
    return array;
}

const array = [6, 5, 4, 7, 3, 8, 2, 1];
console.log(bubbleSort(array));
console.log(insertSort(array));