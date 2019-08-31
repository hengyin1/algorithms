
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
BinaryTree.prototype.inorder = function (callback) {
    this._inorder(this.root, callback);
}

BinaryTree.prototype._inorder = function (current, callback) {
    if (!current) {
        return;
    }
    if (typeof(callback) == "function") {
        callback(current);
    }
    this._inorder(current.left, callback);
    this._inorder(current.right, callback);
}

//二叉树中序遍历
BinaryTree.prototype.preorder = function (callback) {
    this._preorder(this.root, callback);
}

BinaryTree.prototype._preorder = function (current, callback) {
    if (!current) {
        return;
    }
    this._preorder(current.left, callback);
    if (typeof(callback) == "function") {
        callback(current);
    }
    this._preorder(current.right, callback);
}

//二叉树的后序遍历
BinaryTree.prototype.postorder = function (callback) {
    this._postorder(this.root, callback);
}

BinaryTree.prototype._postorder = function (current, callback) {
    if (!current) {
        return;
    }
    this._postorder(current.left, callback);
    this._postorder(current.right, callback);
    if (typeof(callback) == "function") {
        callback(current);
    }
}

//计算二叉树高度
BinaryTree.prototype.getHeight = function () {
    return  this._getHeight(this.root);
}

BinaryTree.prototype._getHeight = function (node) {
    if (!node) {
        return 0;
    }
    return 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
}

//二叉查找树最小值
BinaryTree.prototype.findMin = function () {
    if (!this.root) {
        return;
    }
    return this._findMin(this.root);
}

BinaryTree.prototype._findMin = function (node) {
    if (!node.left) {
        return node;
    }
    return this._findMin(node.left);
}

//二叉查找树最大值
BinaryTree.prototype.findMax = function () {
    if (!this.root) {
        return;
    }
    let current = this.root;
    while (current.right) {
        current = current.right;
    }
    return current;
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

binaryTree.inorder(node => {
    console.log(node.value);
});

console.log("height", binaryTree.getHeight());

console.log("findMin", binaryTree.findMin().value);

console.log("findMax", binaryTree.findMax().value);










