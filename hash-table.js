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
      character = val.charCodeAt(i);
      hashCode = ((hashCode << 5) - hashCode) + character;
      hashCode = hashCode & hashCode;
    }
    return hashCode;
};