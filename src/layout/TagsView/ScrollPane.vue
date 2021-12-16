<!--
 * @description:
 * @Author: changjia
 * @Date: 2021-12-16 21:21:10
 * @LastEditors: changjia
 * @LastEditTime: 2021-12-16 22:56:17
-->
<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot></slot>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'ScrollPane',
  data() {
    return {
      left: 0
    }
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap
    }
  },
  mounted() {
    this.scrollWrapper.addEventListener('scroll', this.emitScroll,true)
  },
  beforeDestroy() {
    this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
  },
  methods: {
    handleScroll(e) {
      const eventData = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventData / 4
    },
    emitScroll() {
      this.$emit('scroll')
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.scrollWrapper
      const tagList = this.$parent.$refs.tag

      let firstTag = null
      let lastTag = null

      // 查找firstTag和lastTag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }
      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      }else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      }else {
        // 查找preTag和 nextTag
        const currentIndex = tagList.findIndex(item => item == currentTag)
        const pervTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        //标签的offsetLeft在nextTag之后
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // 在prevTag之前的标签的offsetLeft
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
