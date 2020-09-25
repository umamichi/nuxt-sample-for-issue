<template lang="pug">
div
  section.wrapJobContentImageSlider.overflowH
    div(v-swiper:swiper="SwiperOptions")
      ul.swiper-wrapper.innerJobContentImageSlider
        li.swiper-slide.slideImage.floatL
          img(
            src="https://dummyimage.com/270x200/000/fff", alt="sample image"
          )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import shortid from 'shortid'
import Swiper from 'swiper'

@Component
export default class JobContentSlider extends Vue {
  /**
   * vue-awesome-swiper
   */
  public activeIndex: number = 0
  /** コンポーネントのID */
  public componentId: string = shortid.generate()
  /** Swiperの設定 */
  public SwiperOptions = {}
  /** Swiperのインスタンス */
  private swiper: Swiper

  /** ライフサイクル */
  public beforeMount(): void {
    // ページマウント直前のcomponentIdを使ってカルーセルを設定
    this.SwiperOptions = {
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: `.swiper-pagination-bullets[data-component-id="${this.componentId}"]`,
        clickable: true,
        bulletActiveClass: 'on',
        bulletClass: 'floatL',
        bulletElement: 'li'
      },
      navigation: {
        nextEl: '.next',
        prevEl: '.previous'
      },
      on: {
        slideChange: () => {
          this.activeIndex = this.swiper.activeIndex
        }
      }
    } as Swiper['params']
  }
}
</script>

<style lang="scss" scoped>
.wrapJobContentImageSlider {
  width: 100%;
  margin-bottom: 16px;
  position: relative;
  @include pc {
    margin-bottom: 32px;
  }
}

.innerJobContentImageSlider {
  height: 200px;
  margin: auto;
  @include pc {
    height: 275px;
  }

  .slideImage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 270px;
    height: 100%;
    margin-right: 32px;
    background-color: rgb(243, 243, 243);
    @include pc {
      width: 370px;
      height: 100%;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .slideImage:last-child {
    margin: 0;
  }
}
</style>
