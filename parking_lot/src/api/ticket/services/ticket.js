'use strict';

/**
 * ticket service.
 */

const { createCoreService } = require('@strapi/strapi').factories;


const calculateDistance = (set, k) => {
    return Math.sqrt(Math.pow(set[0] - k[0], 2) + Math.pow(set[1] - k[1], 2));
  };

  const swap = (d, i, j) => {
    var tmp = d[i];
    d[i] = d[j];
    d[j] = tmp;
  };

  const minHeapify = (d, i, length) => {
    while (true) {
      let left = i * 2 + 1;
      let right = i * 2 + 2;
      let parent = i;
      let largest = i;

      if (left < length && d[left].distance < d[parent].distance) {
        largest = left;
      }

      if (right < length && d[right].distance < d[parent].distance) {
        largest = right;
      }

      if (largest === i) {
        break;
      }

      swap(d, i, largest);
      i = largest;
    }
  };

  const heapify = (d, length) => {
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
      minHeapify(d, i, length); //data is array; index is 5, length is 10
    }
  };

  const heapSort = (d) => {
    return new Promise((resolve, reject) => {
      heapify(d, d.length);

      for (let i = d.length - 1; i > 0; i--) {
        minHeapify(d, 0, i);
      }
      resolve(d);
    });
  };



module.exports = createCoreService('api::ticket.ticket',({strapi})=>({

   async kPoints (d, k){
        let disArr = [];
        for (let i = 0; i < d.length; i++) {
          disArr.push({
            points: d[i],
            distance: calculateDistance(d[i], k),
          });
        }
        return heapSort(disArr).then((res) => {
          return res[0].points;
        });
      }
    
}));
