
function Node(data) {
    this.data = data;
    this.next = null;
    this.pre = null;
}

function LinkedList() {
    this.first = null;
    this.last = null;
}

LinkedList.prototype.push = function (data) {
    const node = new Node(data);
    if (this.first === null) {
        this.first = this.last = node;
    } else {
        const temp = this.last;
        this.last = node;
        node.pre = temp;
        temp.next = node;
    }
}

LinkedList.prototype.unshift = function (data) {
    const node = new Node(data);
    if (this.first === null) {
        this.first = this.last = node;
    } else {
        const temp = this.first;
        this.first = node;
        temp.pre = node;
        node.next = temp;
    }
}

LinkedList.prototype.pop = function () {
    if (this.last === null) {
        return null;
    } else {
        let temp = this.last;
        this.last = this.last.pre;
        return temp;
    }
}

LinkedList.prototype.shift = function () {
    if (this.first === null) {
        return null;
    } else {
        const temp = this.first;
        this.first = temp.next;
        this.first.pre = null;
        return temp;
    }
}

//双向链表按索引删除一个或者添加一个节点
LinkedList.prototype.splice = function (index, node) {
    let count = 0;
    let temp = this.first;
    while (index !== count && temp.next) {
        temp = temp.next;
        count++;
    }
    const pre = temp.pre;
    if (!node) {
        pre.next = temp.next;
        if (!temp.next) {
            this.last = temp.pre;
        } else {
            temp.next.pre = pre;
        }
        return temp;
    } else {
        node.next = temp;
        temp.pre = node;
        node.pre = pre;
        pre.next = node;
    }
}

//双向链表的反转
LinkedList.prototype.reverse = function () {
    if (!this.first || !this.first.next) {
        return;
    }
    let next = null;
    let temp = this.first;
    while (temp != null) {
        next = temp.next;
        temp.next = temp.pre;
        temp.pre = next;
        temp = next;
        console.log(this.last);
    }
    let first = this.first;
    this.first = this.last;
    this.last = first;
}

function comparator(a, b) {
    return a - b;
}

function quickSort(leftNode, rightNode, cmp, key) {
    const {pivot, left, right} = partition(leftNode, rightNode, cmp, key);
    // console.log('pivot', pivot);
    // console.log('left', left);
    // console.log('right', right);
    // if (left != pivot.pre) {
    //     quickSort(left, pivot.pre, cmp, key);
    // }
    // if (right != pivot.next) {
    //     quickSort(pivot.next, right, cmp, key);
    // }
}

function partition(leftNode, rightNode, cmp, key) {
    let pivot = rightNode;
    pivot.next = null;
    pivot.pre = null;
    let left = null;
    let right = null;
    let next = null;
    let temp = leftNode;
    do {
        next = temp.next;
        if (cmp(temp[key], pivot[key]) > 0) {
            temp.next = pivot.next;
            pivot.next = temp;
            temp.pre = pivot;
            if (!right) {
                right = temp;
            }
        } else {
            temp.pre = pivot.pre;
            pivot.pre = temp;
            temp.next = pivot;
            if (!left) {
                left = temp;
            }
        }
        temp = next;
    } while (temp.next);
    return {pivot, left, right};
}

const linkedList = new LinkedList();
linkedList.push(4);
linkedList.push(3);
linkedList.push(2);
linkedList.push(1);
// console.log(JSON.parse(JSON.stringify(linkedList.first)));
// console.log({...linkedList.first});
// console.log(Object.assign({}, linkedList.first));
// const shift = linkedList.shift();
// console.log("shift", shift);
// const pop = linkedList.pop();
// console.log('pop', pop);
// linkedList.push(4);
// linkedList.reverse();
// linkedList.splice(4, new Node(5));
// const node = linkedList.splice(2);
// console.log('node', node);
// console.log(linkedList.last);
quickSort(linkedList.first, linkedList.last, comparator, "data");
console.log(linkedList.first);