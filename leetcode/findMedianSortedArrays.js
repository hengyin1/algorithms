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
      }
  };

  return  binarySearch((left + right) / 2);
}; 

console.log(findMedianSortedArrays([1, 2, 3], [4, 5]));