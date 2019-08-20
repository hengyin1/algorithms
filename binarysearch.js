function binarySearch(array, value) {
    let left = 0;
    let right = array.length - 1;
    while (left<= right) {
        let mid = Math.floor((left + right) / 2);
        if (array[mid] == value) {
            return mid;
        } else if (array[mid] > value) {
            right = mid - 1;
        } else if (array[mid] < value) {
            left = mid + 1;
        }
    }
    return -1;
}

function binarySearchFirst(array, value) {//二分查找 查找第一个等于 给定值的元素
    let left = 0;
    let right = array.length - 1;
    while (left<= right) {
        let mid = Math.floor((left + right) / 2);
        if (array[mid] > value) {
            right = mid - 1;
        } else if (array[mid] < value) {
            left = mid + 1;
        } else {
            if (mid === 0 || array[mid - 1] != value) {
                return mid;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

function binarySearchLast(array, value) {//二分查找 查找最后一个等于 给定值的元素
    let left = 0;
    let right = array.length - 1;
    while (left<= right) {
        let mid = Math.floor((left + right) / 2);
        if (array[mid] > value) {
            right = mid - 1;
        } else if (array[mid] < value) {
            left = mid + 1;
        } else {
            if (mid === array.length - 1 || array[mid + 1] != value) {
                return mid;
            } else {
                left = mid + 1;
            }
        }
    }
    return -1;
}


function binarySearchFirstOne(array, value) {//二分查找 查找第一个大于等于 给定值的元素
    let left = 0;
    let right = array.length - 1;
    while (left<= right) {
        let mid = Math.floor((left + right) / 2);
        if (array[mid] >= value) {
            if (mid === 0 || array[mid - 1] < value) {
                return mid;
            } else {
                right = mid - 1;
            }
        } else if (array[mid] < value) {
            left = mid + 1;
        }
    }
    return -1;
}

const array = [0, 1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearchFirst(array, 4));
console.log(binarySearchLast(array, 4));
console.log(binarySearchFirstOne(array, 4));