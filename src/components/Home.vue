<template>
    <div class="home-container">
      <h1>Welcome!</h1>
      <p>
        Discover our modern and efficient HR management platform. Use the menu to access features.      </p>
      <button class="btn-action">Explore</button>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* Style pour une structure élégante avec un thème noir et blanc */
  .home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 80vh;
    background-color: #fff;
    color: #0000; /* Texte blanc */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #000; /* Texte pur blanc */
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    max-width: 600px;
    line-height: 1.6;
    color: #000; /* Texte légèrement gris pour le contraste */
  }
  
  /* Bouton avec des accents de couleur */
  .btn-action {
    font-size: 1.1rem;
    padding: 12px 24px;
    border: 2px solid #f5c518; /* Bordure dorée */
    border-radius: 50px;
    background-color: transparent;
    color: #f5c518; /* Texte doré */
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  
  .btn-action:hover {
    background-color: #f5c518; /* Fond doré au survol */
    color: #121212; /* Texte noir pour le contraste */
    transform: scale(1.1); /* Effet zoom */
    box-shadow: 0 4px 10px rgba(245, 197, 24, 0.5); /* Ombre dorée */
  }
  </style>
  