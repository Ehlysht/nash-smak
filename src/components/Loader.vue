<template>
    <div class="overlay-loader">
        <div class="loader"></div>
    </div>
</template>
  
  <script>
  export default {
    name: "Loader",
  };
  </script>
  
  <style>
  .overlay-loader{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    display: flex;  
    justify-content: center;
    align-items: center;
    background: #fff;
  }
  .loader {
    display: inline-block;
    width: 64px;
    height: 64px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    margin: 8px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #00A439 transparent #00A439 transparent;
    animation: loader 1s linear infinite;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>