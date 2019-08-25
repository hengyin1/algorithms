//链表法 散列表
function Node(key, data) {
    this.key = key;
    this.data = data;
    this.prev = null;
    this.next = null;
}

function Hashtable() {
    this.buckets = [];
    this.maxBucketCount = 100;
}

Hashtable.prototype.hashCode = function (val) {
    let hashCode = 0;
    let character;
    if (val.length === 0 || val.length === undefined) {
      return val;
    }
    for (let i = 0; i < val.length; i++) {
      character = val.codePointAt(i);
      hashCode = ((hashCode << 5) - hashCode) + character;
      hashCode = hashCode & hashCode;
    }
    return hashCode;
};

Hashtable.prototype.put = function (key, data) {
    let hashCode = this.hashCode(key);
    hashCode = hashCode % this.maxBucketCount;
    const newNode = new Node(key, data);
    if (this.buckets[hashCode] === undefined) {
        this.buckets[hashCode] = newNode;
        return;
    }
    if (this.buckets[hashCode].key === key) {
        this.buckets[hashCode].data = data;
        return;
    }
    let first = this.buckets[hashCode];
    while (first.next) {
        first = first.next;
    }
    first.next = newNode;
    newNode.prev = first;
};

Hashtable.prototype.get = function (key) {
    let hashCode = this.hashCode(key);
    hashCode = hashCode % this.maxBucketCount;
    if (this.buckets[hashCode] === undefined) {
        return undefined;
    }
    let first = this.buckets[hashCode];
    while (first) {
        if (first.key === key) {
            return first.data;
        }
        first = first.next;
    }
    return undefined;
};

Hashtable.prototype.remove = function (key) {
    let hashCode = this.hashCode(key);
    hashCode = hashCode % this.maxBucketCount;
    if (this.buckets[hashCode] === undefined) {
        return undefined;
    }
    let first = this.buckets[hashCode];
    if (!first.prev &&  !first.next) {
        const data = first.data;
        this.data[hashCode] = undefined;
        return data;
    }
    while (first) {
        const next = first.next;
        if (first.key === key) {
            if (first.next) {
                first.next.prev = first.prev;
            }
            if (first.prev) {
                first.prev.next = first.next;
            }
            return first.data;
        }
        first = next;
    }
    return undefined;
};

let hashtable = new Hashtable();
hashtable.put("abc", 1);
hashtable.put("abe", 2);
hashtable.put("acd", 3);
hashtable.put("acf", 4);
hashtable.put("acg", 5);
hashtable.put("bcf", 6);
hashtable.put("12", 7);
hashtable.put("34", 8);
hashtable.put("24", 9);
console.log(hashtable.buckets);
console.log(hashtable.get("acd"));
