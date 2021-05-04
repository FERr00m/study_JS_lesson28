document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
      const cars = () => {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open('GET', './cars.json');
          request.setRequestHeader('Content-type', 'application/json');
          request.send();
          request.addEventListener('readystatechange', () => {
              if (request.readyState !== 4) {
                return;
              } 
              if (request.status === 200) {
                  const data = JSON.parse(request.responseText);
                  resolve(data)
              } else {
                reject(request.status);
              }
          });
        });
      }

      const render = data => {
        return new Promise((resolve, reject) => {
          let result = 'Произошла ошибка';
          data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                result = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
                resolve(result);
            }
          });
          reject(result)
        });
      }
      
      cars()
        .then(render)
        .then(result => output.innerHTML = result)
        .catch(error => console.warn(error))
        
    });
});
