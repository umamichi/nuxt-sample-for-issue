<template lang="pug">
.wrapper
  .displayOn
    section.section
      .sectionInner
        .card
          .cardContentWrap
            .cardContents
              n-link(
                :to="`/detail/123/`"
              ).image
                LazyImage(src="https://dummyimage.com/80x80/000/fff", alt="image" imgClass="loading")
              .informationTextWrap
                n-link.appealText(
                  :to="`/detail/123/`"
                ) {{"Link 1 texttexttexttexttexttexttexttexttexttexttexttext"}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LazyImage from '@/components/partials/lazyImage/LazyImage.vue'

@Component({
  components: {
    LazyImage
  }
})
export default class SearchList extends Vue {}
</script>

<style lang="scss" scoped>
.appealText:hover {
  color: #ccc;
}

.wrapper {
  width: 100%;
  @include pc {
    width: calc(100% - 293px);
    padding: 0;
    position: relative;
  }
  .displayOn {
    display: block;
  }
}

.section {
  width: 100%;
  display: block;
}

.sectionInner {
  padding-top: 21px;
  width: auto;
  margin: 0 20px;
  @include pc {
    width: 100%;
    margin: 0;
    padding-top: 24px;
  }

  section {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    @include pc {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.card {
  width: 100%;

  .off {
    display: none;
  }
}

.cardContentWrap {
  width: 100%;
  padding: 16px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  display: inline-block;
  position: relative;
  @include pc {
    padding: 24px 16px 16px;
  }
}

.cardContents {
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  @include pc {
    margin-bottom: 0;
  }

  .image {
    width: 100px;
    height: 75px;
    margin-right: 16px;
    background-color: $imagesBg;
    position: relative;
    flex-shrink: 0;
    @include pc {
      width: 107px;
      height: 80px;
    }

    img {
      width: auto;
      max-width: 100%;
      height: 100%;
      margin: 0 auto;
    }

    .loading[lazy='loading'] {
      display: block;
      width: 20px;
      height: 32px;
      position: absolute;
      left: calc(50% - 10px);
      top: calc(50% - 16px);
    }
  }
}
</style>
