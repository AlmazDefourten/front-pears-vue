<template>
  <div id="swiper" style="width:100%; height: 100%;">
  </div>
  <div
    class="mt-5"
    style="display: flex; justify-content: center"
  >
    <v-btn
      id="dislike"
      :onclick="onDislike"
      class="yes-no-button"
      icon="mdi-close-thick"
      size="x-large">
    </v-btn>
    <v-btn
      id="like"
      :onClick="onLike"
      class="ml-15 yes-no-button"
      icon="mdi-check-bold"
      size="x-large">
    </v-btn>
  </div>
</template>
<script lang="js" setup>

import Card from "./card";
import {onMounted, ref} from "vue";

import styles from '../styles/swipes.css';
import {TestData} from "@/assets/data/TestData";
import axios from "axios";
import {DefaultApi} from "@/env";

let CardsArr = [];
let cardCount = 0;

onMounted(async () => {
  const swiper = document.querySelector('#swiper');
  const like = document.querySelector('#like');
  const dislike = document.querySelector('#dislike');

  const cardsData = ref();

  function appendNewCard() {
    const card = new Card({
      imageUrl: TestData.urls[cardCount],
      nickname: cardsData.value[cardCount].id,
      description: cardsData.value[cardCount].description,
      onLike: () => {
        like.style.animationPlayState = 'running';
        like.classList.toggle('trigger');
      },
      onDislike: () => {
        dislike.style.animationPlayState = 'running';
        dislike.classList.toggle('trigger');
      }
    });
    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((cardel, index) => {
      cardel.style.setProperty('--i', index);
    });
  }

  await axios.get(DefaultApi + "Cards", {params: {PageNumber: 1, PageSize: 1000}})
    .then(response => {
      cardsData.value = response.data.items;
      console.log(cardsData.value);
      for (let i = 0; i < cardsData.value.length; i++) {
        appendNewCard();
      }
    }, error => {
      console.log(error);
    });

});

const onDislike = () => {
}

const onLike = () => {
}

</script>
<style scoped>

@import "../styles/swipes.css";

</style>
