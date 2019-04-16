console.log('validacni utility')

const button1 = document.getElementById('validateButton')
const button2 = document.getElementById('validateButton2')
const input = document.getElementById('emailInput')
const result = document.getElementById('validationResult')

button1.addEventListener('click', function () {
  validateEmail(2)
})
button2.addEventListener('click', function () {
  validateEmail(5)
})

function updateButtonState (state) {
  if (state === true) {
    button1.setAttribute('disabled', '1')
    button2.setAttribute('disabled', '1')
  } else {
    button1.removeAttribute('disabled')
    button2.removeAttribute('disabled')
  }

}

function validateEmail (delay) {
  updateButtonState(true)

  const emailAddress = input.value
  const url = `/validate/`

  result.innerHTML = 'cekej...'

  axios.get(url, {
    params: {
      timestamp: (new Date()).getTime(),
      email: emailAddress,
      delay: delay
    }
  })
    .then(function (response) {
      if (response.data.result.reason === 'race condition') {
        console.log('ignorujeme validaci')
      } else if (response.data.result.isEmailValid === false) {
        result.innerHTML = 'Emailova adresa neni validni.'
      } else {
        result.innerHTML = 'Emailova adresa je v pohode.'
      }
      updateButtonState(false)
    })
    .catch(function () {
      result.innerHTML = 'CHYBA: Neni mozne validovat emailovou adresu.'
    })
}


/*
function ajax (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

 */
