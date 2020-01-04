// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

// 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

// 你可以假设 nums1 和 nums2 不会同时为空。

// 示例 1:

// nums1 = [1, 3]
// nums2 = [2]

// 则中位数是 2.0
// 示例 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// 则中位数是 (2 + 3)/2 = 2.5


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  if (nums1.length > nums2.length) {
      const tem = nums1;
      nums1 = nums2;
      nums2 = tem;
  }

  const nums1Length = nums1.length;
  const nums2Length = nums2.length;
  let left = 0;
  let right = nums1Length;

  const binarySearch = function (i) {
      i = Math.ceil(i)
      let j = Math.ceil((nums1Length + nums2Length) / 2 - i);
      
      if (i > 0 && nums1[i - 1] > nums2[j]) {
          right = i - 1;
          return binarySearch((left + right) / 2);
      } else if (i < right && nums2[j - 1] > nums1[i]) {  
          left = i + 1;
          return binarySearch((left + right) / 2);
      } else {
        let maxLeft = null;
        if (i === 0) {
          maxLeft = nums2[j - 1];
        } else if (j === 0) {
          maxLeft = nums1[i - 1];
        } else {
          maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
        }

        if ((nums1Length + nums2Length) % 2 === 1) return maxLeft;

        let minRight = null;
        if (i === nums1Length) {
          minRight = nums2[j];
        } else if (j === nums2Length) {
          minRight = nums1[i];
        } else {
          minRight = Math.min(nums1[i], nums2[j]);
        }

        return (maxLeft + minRight) / 2;
      }
  };

  return  binarySearch((left + right) / 2);
}; 

console.log(findMedianSortedArrays([1, 2], [4, 5]));