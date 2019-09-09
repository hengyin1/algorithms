
function Heap(cmp) {
    this._heap = [];
    this._count = 1;
    if (cmp) {
        this._cmp = cmp;
    } else {
        this._cmp = (a, b) => {
            return a - b;
        };
    }
}

//堆插入
Heap.prototype.insert = function (value) {
    let count = this._count;
    this._heap[count] = value;
    this._count += 1;
    let parent = Math.floor(count / 2);
    while (parent > 0 && this._cmp(value, this._heap[parent]) > 0) {
        this._heap[count] = this._heap[parent];
        this._heap[parent] = value;
        count = parent;
        parent = Math.floor(count / 2);
    }
}

//堆删除
Heap.prototype.removeTop = function () {
    if (this._count === 1) {
        return;
    }
    const pop = this._heap.pop();
    this._heap[1] = pop;
    this.heapify(this._heap.length - 1, 1);
}

//从上往下堆话
Heap.prototype.heapify = function (endIndex, startIndex) {
  while (true) {
        let maxIndex = startIndex;
        if (startIndex * 2 <= endIndex && this._cmp(this._heap[startIndex], this._heap[startIndex * 2]) < 0) {
          maxIndex = startIndex * 2;
        }
        if (startIndex * 2 + 1 <= endIndex && this._cmp(this._heap[maxIndex], this._heap[startIndex * 2 + 1]) < 0) {
          maxIndex = startIndex * 2 + 1;
        } 
        if (maxIndex == startIndex) {
          return;
        }
        const _value = this._heap[startIndex];
        this._heap[startIndex] = this._heap[maxIndex];
        this._heap[maxIndex] = _value;
        startIndex = maxIndex;
    }
}

Heap.prototype.sort = function () {
  let count = this._heap.length - 1;
  while (count > 1) {
    const value = this._heap[count];
    this._heap[count] = this._heap[1];
    this._heap[1] = value;
    count--;
    this.heapify(count, 1);
  }
}

const heap = new Heap();
const arr = [1, 9, 20, 3, 6, 13, 10, 8, 53, 23, 35];
arr.forEach(item => {
  heap.insert(item);
});
heap.sort();
console.log('heap', heap._heap);
