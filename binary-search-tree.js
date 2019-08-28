
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

BinaryTree.prototype.find = function (value) {
    if (this.root === null) {
        return null;
    }
    let current = this.root;
    while (current) {
        if (current.value === value) {
            return current;
        } else if (current.value > value) {
            current = current._left;
        } else {
            current = current._right;
        }
    }
    return null;
}

BinaryTree.prototype.remove = function (value) {
    if (this.root === null) {
        return null;
    }
    let current = this.root;
    while (current && current.value !== value) {
        if (current.value > value) {
            current = current._left;
        } else {
            current = current._right;
        }
    }
    if (current === null) {
        return null;
    }

    if (current._left !== null && current._right !== null) {
        let childNode = current._right;
        while (childNode._left) {
            childNode = childNode._left;
        }
        current.value = childNode.value;
        childNode._parent._left = null;
    } else if (current._left !== null) {
        
    } else if (current._right !== null) {
        
    } else {

    }
}