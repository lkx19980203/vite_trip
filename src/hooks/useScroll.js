import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
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

export default function (elRef) {
  let el = window
  const isReachBottom = ref(false)
  const scrollHeight = ref(0)
  const scrollTop = ref(0)
  const clientHeight = ref(0)

  // underscore throttle默认有头有尾
  const scrollFn = throttle(() => {
    if (el === window) {
      scrollHeight.value = document.documentElement.scrollHeight;
      scrollTop.value = document.documentElement.scrollTop;
      clientHeight.value = document.documentElement.clientHeight;
    } else {
      scrollHeight.value = el.scrollHeight;
      scrollTop.value = el.scrollTop;
      clientHeight.value = el.clientHeight;
    }

    console.log(scrollTop.value + clientHeight.value, scrollHeight.value)


    if (scrollTop.value + clientHeight.value >= scrollHeight.value - 1) {
      console.log('滚到底部了');
      isReachBottom.value = true
    }
  }, 100)



  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollFn)
  })
  onActivated(() => {
    if (elRef) el = elRef.value
    el.scrollTo({ top: scrollTop.value });
    el.addEventListener("scroll", scrollFn)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollFn)
  })
  onDeactivated(() => {
    el.removeEventListener("scroll", scrollFn)

  })

  return { isReachBottom, scrollTop, scrollHeight, clientHeight }
};