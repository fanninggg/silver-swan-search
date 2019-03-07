import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.min.css'

const slider = document.getElementById('age-slider')

if (slider) {
  const lowerLimit = document.getElementById('search_age_lower_limit')
  const upperLimit = document.getElementById('search_age_upper_limit')
  noUiSlider.create(slider, {
    start: [lowerLimit.dataset.value, upperLimit.dataset.value],
    connect: true,
    step: 1,
    range: {
      'min': 18,
      'max': 70
    }
  })

  slider.noUiSlider.on('update', values => {
    lowerLimit.value = parseInt(values[0])
    upperLimit.value = parseInt(values[1])
  })

  const setSlider = () => {
    slider.noUiSlider.set([lowerLimit.value, upperLimit.value])
  }

  lowerLimit.addEventListener('blur', setSlider)
  upperLimit.addEventListener('blur', setSlider)
}
