import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'underscore'
// export default function (reachBottomCb) {

//   const scrollFn = () => {
//     const scrollHeight = document.documentElement.scrollHeight;
//     const scrollTop = document.documentElement.scrollTop;
//     const clientHeight = document.documentElement.clientHeight;

//     console.log('--------');

//     if (scrollTop + clientHeight >= scrollHeight) {
//       console.log('滚到底部了');
//       if (reachBottomCb) reachBottomCb()
//     }
//   }


//   onMounted(() => {
//     window.addEventListener("scroll", scrollFn)
//   })

//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollFn)
//   })
// };

export default function () {
  const isReachBottom = ref(false)
  const scrollHeight = ref(0)
  const scrollTop = ref(0)
  const clientHeight = ref(0)

  const scrollFn = throttle(() => {
    scrollHeight.value = document.documentElement.scrollHeight;
    scrollTop.value = document.documentElement.scrollTop;
    clientHeight.value = document.documentElement.clientHeight;

    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      console.log('滚到底部了');
      isReachBottom.value = true
    }
  }, 100)



  onMounted(() => {
    window.addEventListener("scroll", scrollFn)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollFn)
  })

  return { isReachBottom, scrollTop, scrollHeight, clientHeight }
};