
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
    this.heapify();
}

//从上往下堆话
Heap.prototype.heapify = function () {
    let count = 1;
    while (true) {
        if (count * 2 < this._heap.length && this._cmp(this._heap[count], this._heap[count * 2]) < 0) {
            const _value = this._heap[count];
            this._heap[count] = this._heap[count * 2];
            this._heap[count * 2] = _value;
            count = count * 2;
        } else if (count * 2 + 1 < this._heap.length && this._cmp(this._heap[count], this._heap[count * 2 + 1]) < 0) {
            const _value = this._heap[count];
            this._heap[count] = this._heap[count * 2 + 1];
            this._heap[count * 2 + 1] = _value;
            count = count * 2 + 1;
        } else {
            return;
        }
    }
}

Heap.prototype.sort = function () {
    
}