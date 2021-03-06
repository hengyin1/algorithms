function comparator(a, b) {
    return a - b;
}

function bubbleSort(array, cmp) {//冒泡排序
    cmp = cmp || comparator;
    let temp;
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (cmp(array[j], array[j - 1]) < 0) {
                temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        }
    }

    return array;
}

function insertSort(array, cmp) {//插入排序
    cmp = cmp || comparator;
    for (let i = 1; i < array.length; i++) {
        let temp = array[i];
        let j = i - 1;
        for (; j >= 0; j--) {
            if (cmp(temp, array[j]) < 0) {
                array[j + 1] = array[j];
            } else {
                break;
            }
        }
        array[j + 1] = temp;
    }
    return array;
}

function quickSort(array, left, right, cmp) {//快排
    const mid = partition(array, left, right, cmp);
    if (left < mid - 1) {
        quickSort(array, left, mid - 1, cmp);
    }
    if (right > mid) {
        quickSort(array, mid, right, cmp);
    }
}

function partition(array, left, right, cmp) {
    const pivot = array[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (cmp(array[j], pivot) < 0) {
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++;
        }
    }
    array[right] = array[i];
    array[i] = pivot;
    return i;
}

function mergeSort(array, left, right, cmp) {//归并排序
    if (right - left <= 1) {
        return;
    }
    const mid = Math.floor((left + right) / 2);
    mergeSort(array, left, mid, cmp);
    mergeSort(array, mid, right, cmp);
    merge(array, left, right, mid, cmp);
}

function merge(array, left, right, mid, cmp) {
    let temp = [];
    let i = left;
    let j = mid;
    while (i < mid && j < right) {
        if (cmp(array[i], array[j]) < 0) {
            temp.push(array[i]);
            i++;
        } else {
            temp.push(array[j]);
            j++;
        }
    }
    if (i < mid) {
        temp = [...temp, ...array.slice(i, mid)];
    } else if (j < right) {
        temp = [...temp, ...array.slice(j, right)];
    }
    for (let n = 0; n < temp.length; n++) {
        array[left + n] = temp[n];
    }
}

const array = [6, 5, 4, 7, 3, 8, 2, 1];
// console.log(bubbleSort(array));
// console.log(insertSort(array));
// quickSort(array, 0, array.length - 1, comparator);
mergeSort(array, 0, array.length, comparator);
console.log(array);