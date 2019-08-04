
function Node(data) {
    this.data = data;
    this.next = null;
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
        node.next = temp;
    }
}

LinkedList.prototype.pop = function () {
    if (this.last === null) {
        return null;
    } else {
        let pre = null;
        let temp = this.first;
        while (temp.next != null) {
            pre = temp;
            temp = temp.next;
        }
        pre.next = null;
        this.last = pre;
        return temp;
    }
}

LinkedList.prototype.shift = function () {
    if (this.first === null) {
        return null;
    } else {
        const temp = this.first;
        this.first = temp.next;
        return temp;
    }
}

//单向链表按索引删除一个或者添加一个节点
LinkedList.prototype.splice = function (index, node) {
    let dummyFirst = {next: null};
    let count = 0;
    let pre = dummyFirst;
    let next = null;
    let temp = this.first;
    while (index !== count && temp.next) {
        next = temp.next;
        temp.next = null;
        pre.next = temp;
        pre = temp;
        temp = next;
        count++;
    }
    if (!node) {
        if (!temp.next) {
            this.last = pre;
        }
        pre.next = temp.next;
    } else {
        node.next = temp;
        pre.next = node;
    }
    this.first = dummyFirst.next;
    return temp;
}

//单向链表选择排序
LinkedList.prototype.sort = function (key, cb) {
    let dummyFirst = {next: null};
    let pre = dummyFirst;
    let next = null;
    let temp = this.first;
    while (temp) { 
        next = temp.next;
        while (pre.next && cb(temp[key], pre.next[key])) {
            pre = pre.next;
        }
        temp.next = pre.next;
        pre.next = temp;
        pre = dummyFirst;
        temp = next;
    }
    return dummyFirst.next;
}

//单向链表的反转
LinkedList.prototype.reverse = function () {
    if (!this.first || !this.first.next) {
        return;
    }
    let pre = null;
    let next = null;
    let temp = this.first;
    while (temp != null) {
        next = temp.next;
        temp.next = pre;
        pre = temp;
        temp = next;
    }
    this.last = this.first;
    this.first = pre;
}

const linkedList = new LinkedList();
linkedList.push(3);
linkedList.push(1);
linkedList.push(2);
linkedList.unshift(4);
console.log(JSON.parse(JSON.stringify(linkedList.first)));
// let sort = linkedList.sort("data", function (a, b) {
//     if (a >= b) {
//         return 1;
//     } else {
//         return 0;
//     }
// })
// console.log("sort", sort);
// console.log({...linkedList.first});
// console.log(Object.assign({}, linkedList.first));
// const shift = linkedList.shift();
// console.log("shift", shift);
// const pop = linkedList.pop();
// console.log('pop', pop);
// linkedList.push(4);
// linkedList.reverse();
linkedList.splice(4, new Node(5));
// const node = linkedList.splice(3);
// console.log('node', node);
console.log(linkedList.last);
console.log(linkedList.first);