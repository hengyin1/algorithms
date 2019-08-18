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

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binarySearch(array, 10));