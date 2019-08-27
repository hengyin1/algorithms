
function Node(value, left, right, parent) {
    this.value = value;
    this._left = left;
    this._right = right;
    this._parent = parent;
}

function BinaryTree() {
    this.root = null;
}

BinaryTree.prototype.insert = function (value, current) {
    if (this.insert === null) {
        this.root = new Node(value, null, null, null);
        return;
    }
    let insertKey;
    current = current || this.root;
    if (current.value > value) {
        insertKey = "_left";
    } else {
        insertKey = "_right";
    }
    if (!current[insertKey]) {
        current[insertKey] = new Node(value, null, null, current);
    } else {
        this.insert(value, current[insertKey]);
    }
}