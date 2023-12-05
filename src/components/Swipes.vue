<template>
  <swiper
    v-if="swiperVisible"
    class="ml-16"
    :effect="'cards'"
    :modules="modules"
    :virtual="true"
    :spaceBetween="5"
    :slidesPerView="1"
    :observer="true"
    :watchSlidesProgress="true"
    :maxBackfaceHiddenSlides="1"
    @slideChange="slideChange"
  >
    <swiper-slide
      v-for="(slideContent, index) in slides"
      :key="index"
      :virtualIndex="index"
    ><div style="height:500px; justify-self: start;">
      <img style="width: 300px; height: 350px;" src="../assets/pear_logo.svg"/>
      <p v-text="slideContent"></p>
      <p style="font-weight: lighter">Some boring description idk Some boring description idkSome boring description idkSome boring description idk</p>
    </div></swiper-slide>
  </swiper>
</template>
<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { SwiperClass } from "swiper/swiper-react";

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/effect-cards';

import '../styles/swipes.css';

// import required modules
import {EffectCards, Virtual} from 'swiper/modules';
import {ref} from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    let swiperRef: SwiperClass;
    const currentCardId = ref(0);
    const swiperVisible = ref(true);

    const slides = ref(
      Array.from({ length: 5 }).map((_, index) => `Tom martin ${index}`)
    );
    slides.value.push('end');

    const setSwiperRef = (swiper: SwiperClass) => {
      swiperRef = swiper;
    };

    const slideChange = (swiper: SwiperClass) => {
      currentCardId.value = swiper.activeIndex;
      if (swiper.previousIndex < swiper.activeIndex) {

      } else {
      }
      slides.value.splice(swiper.previousIndex, 1);
      swiper.activeIndex = swiper.previousIndex;
      console.log(swiper);
      if (slides.value.length == 0) {
        swiperVisible.value = false;
      }
    }

    const slideTo = (index: number) => {
      swiperRef.slideTo(index - 1, 0);
    };

    return {
      modules: [EffectCards, Virtual],
      setSwiperRef,
      currentCardId,
      slideChange,
      slideTo,
      swiperVisible,
      slides,
    };
  },
};
</script>
<style scoped>
.mySwiper {
}
</style>
