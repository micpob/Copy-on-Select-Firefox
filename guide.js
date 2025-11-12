const optionPageLinks = document.getElementsByClassName('option-page-link')
Array.from(optionPageLinks).forEach(link => {
  link.addEventListener('click', () => {
    browser.runtime.sendMessage("showOptions")
  })
})