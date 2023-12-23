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

let CardsArr = [];
let cardCount = 0;

onMounted(() => {
  const swiper = document.querySelector('#swiper');
  const like = document.querySelector('#like');
  const dislike = document.querySelector('#dislike');

  function appendNewCard() {
    const card = new Card({
      imageUrl: TestData.urls[cardCount % 5],
      onDismiss: appendNewCard,
      nickname: TestData.nicknames[cardCount % 5],
      description: TestData.descriptions[cardCount % 5],
      onLike: () => {
        TestData.choiceHistory.push(CardsArr[cardCount - 1]);
        console.log(TestData.choiceHistory);
        like.style.animationPlayState = 'running';
        like.classList.toggle('trigger');
      },
      onDislike: () => {
        console.log(TestData.choiceHistory);
        dislike.style.animationPlayState = 'running';
        dislike.classList.toggle('trigger');
      }
    });
    swiper.append(card.element);
    CardsArr[cardCount] = card;
    cardCount++;
    if (cardCount >= 5) {
      cardCount = 0;
    }

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((cardel, index) => {
      cardel.style.setProperty('--i', index);
    });
  }

  for (let i = 0; i < 5; i++) {
    appendNewCard();
  }
});

const onDislike = () => {
  CardsArr[cardCount].swipe(-1);
}

const onLike = () => {
  CardsArr[cardCount].swipe(1);
}

</script>
<style scoped>

@import "../styles/swipes.css";

</style>
