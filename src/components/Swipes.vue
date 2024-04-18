<template>
  <div id="swiper" style="width:100%; height: 100%;">
  </div>
  <div
    class="mt-5"
    style="display: flex; justify-content: center"
  >
    <v-btn
      id="dislike"
      class="yes-no-button"
      icon="mdi-close-thick"
      size="x-large"
      @click="onDislike">
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

let cardCount = 0;
const cardsData = ref();
const like = ref();
const dislike = ref();
const swiper = ref();
const cardsClasses = ref([]);

onMounted(async () => {
  swiper.value = document.querySelector('#swiper');
  like.value = document.querySelector('#like');
  dislike.value = document.querySelector('#dislike');

  function appendNewCard() {
    const card = new Card({
      id: cardsData.value[cardCount].id,
      imageUrl: "data:image/png;base64," + cardsData.value[cardCount].file,
      nickname: cardsData.value[cardCount].realName,
      description: cardsData.value[cardCount].description,
      onDismiss: appendNewCard,
      onLike: (id) => {
        onLike(id);
      },
      onDislike: () => {
        onDislike();
      }
    });
    swiper.value.append(card.element);
    cardsClasses.value.push(card);
    changeCardCount();

    const cards = swiper.value.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((cardel, index) => {
      cardel.style.setProperty('--i', index);
    });
  }

  await axios.get(DefaultApi + "Cards", {params: {PageNumber: 1, PageSize: 1000}})
    .then(response => {
      cardsData.value = response.data;
      console.log(cardsData.value);
      for (let i = 0; i < cardsData.value.length; i++) {
        appendNewCard();
      }
    }, error => {
      console.log(error);
    });

});

const changeCardCount = () => {
  cardCount++;
  console.log(cardsData.value.length);
  if (cardCount >= cardsData.value.length) {
    cardCount = 0;
  }
}

let dismissed = 0;

const onDislike = () => {
  dislike.value.style.animationPlayState = 'running';
  dislike.value.classList.toggle('trigger');
  cardsClasses.value[dismissed++].dismiss(0);
}

const onLike = (id) => {
  like.value.style.animationPlayState = 'running';
  like.value.classList.toggle('trigger');
  cardsClasses.value[dismissed++].dismiss(0);

  axios.post(DefaultApi + "Matches", {matchedUserId: id})
    .then(response => {
    }, error => {
      console.log(error);
    });
}

</script>
<style scoped>

@import "../styles/swipes.css";

</style>
