
function Node(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
}

function BinaryTree() {
    this.root = null;
}

//二叉查找树的插入
BinaryTree.prototype.insert = function (value, current) {
    if (this.root === null) {
        this.root = new Node(value, null, null, null);
        return;
    }
    let insertKey;
    current = current || this.root;
    if (current.value > value) {
        insertKey = "left";
    } else {
        insertKey = "right";
    }
    if (!current[insertKey]) {
        current[insertKey] = new Node(value, null, null, current);
    } else {
        this.insert(value, current[insertKey]);
    }
}

//二叉查找树的查找
BinaryTree.prototype.find = function (value) {
    if (this.root === null) {
        return null;
    }
    let current = this.root;
    while (current) {
        if (current.value === value) {
            return current;
        } else if (current.value > value) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return null;
}

//二叉查找树的删除
BinaryTree.prototype.remove = function (value) {
    if (this.root === null) {
        return null;
    }
    let parent = null;
    let current = this.root;
    while (current && current.value !== value) {
        parent = current;
        if (current.value > value) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    if (current === null) {
        return null;
    }

    if (current.left !== null && current.right !== null) {
        parent = current;
        let _current = current.right;
        while (_current.left) {
            parent = _current;
            _current = _current.left;
        }
        current.value = _current.value;
        current = _current;
    }

    let child = null;
    if (current.left !== null) {
        child = current.left;
    } else if (current.right !== null) {
        child = current.right;
    }

    if (parent === null) {
        this.root = child;
    } else if (parent.left.value === current.value) {
        parent.left = child;
    } else {
        parent.right = child;
    }
}

//二叉树前序遍历
BinaryTree.prototype.preorder = function (callback) {
    this._preorder(this.root, callback);
}

BinaryTree.prototype._preorder = function (current, callback) {
    if (!current) {
        return;
    }
    this._preorder(current.left, callback);
    if (callback) {
        callback(current);
    }
    this._preorder(current.right, callback);
}

let binaryTree = new BinaryTree();
binaryTree.insert(100);
binaryTree.insert(200);
binaryTree.insert(3);
binaryTree.insert(10);
binaryTree.insert(7);
binaryTree.insert(211);
binaryTree.insert(207);
binaryTree.insert(201);
binaryTree.insert(20);
binaryTree.insert(1);
console.log("binaryTree", binaryTree);

// const node = binaryTree.find(1);
// console.log("node", node);

// binaryTree.remove(3);
// console.log("binaryTree", binaryTree);

binaryTree.preorder(node => {
    console.log(node.value);
});







