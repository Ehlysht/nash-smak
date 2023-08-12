<template>
<div class="wrapper">
  <section class="aboutPage" id="aboutPage">
    <div class="container">
        <route routeName="Наша історія"/>
        <div class="aboutPage-about">
            <div class="aboutPage-about_texts">
                <h2 class="aboutPage_title">
                    Про нас
                </h2>
                <h3 class="aboutPage-subtitle">
                    Історія
                </h3>
                <p class="aboutPage-text aboutPage-text1">
                    Історія створення пекарні «Наш смак» починається<br>
                    з 2004 року. Ми мали лише ідею та величезне бажання дарувати людям класні емоції через якісний продукт.
                    <br><br>
                    Спочатку це було лише пісочне печиво, але дуже швидко ми розширили наш асортимент і створили пісочно-бісквітне печиво (та сама відома «Завитушка») та бісквітики.
                </p>
                <h3 class="aboutPage-subtitle">
                    з кожним роком
                </h3>
                <p class="aboutPage-text">
                    Ми набиралися досвіду і ставали кращими. Удосконалювали смак печива, покращували рецептури, інвестували у купівлю найновішого технологічного обладнання.
                </p>
            </div>
            <div class="aboutPage-video">
                <div class="aboutPage-video_content">

                </div>
            </div>
        </div>
    </div>
  </section>
</div>
</template>

<script>
import route from '@/components/route.vue'
export default {
    components: {
        route
    },
    data(){
        return{

        }
    },
    mounted(){
        this.$store.dispatch('setLoader', false);
        this.$store.dispatch('setVisibleMenu', false);
        this.$store.dispatch('setOverlay', false);
    }
}
</script>

<style>

</style>