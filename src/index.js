const {validateEmail} = require('./utilities.js')

console.log('kukuk')

const button1 = document.getElementById('validateButton')
const button2 = document.getElementById('validateButton2')
const buttonLocal = document.getElementById('validateLocal')
const input = document.getElementById('emailInput')
const result = document.getElementById('validationResult')

button1.addEventListener('click', function () {
  validateEmailServer(2)
})
button2.addEventListener('click', function () {
  validateEmailServer(5)
})

buttonLocal.addEventListener('click', function () {
  const vysledek = validateEmail(input.value)
  if (vysledek === false) {
    result.innerHTML = 'Emailova adresa neni validni.'
  } else {
    result.innerHTML = 'Emailova adresa je v pohode.'
  }

  throw new Error('Toto je falesna chyba')

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

function validateEmailServer (delay) {
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
